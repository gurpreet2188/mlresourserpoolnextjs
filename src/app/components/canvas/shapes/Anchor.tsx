import {NodesSettingsStatus} from '@/app/MLResourcePool'
import {AnchorPorps, WorkspaceContextTypes} from '@/app/interface/types'
import {KonvaEventObject} from 'konva/lib/Node'
import React, {useContext, useEffect, useState} from 'react'
import {Circle} from 'react-konva'
import {WorkSpaceContext} from "@/app/components/canvas/Workspace";


function Anchor({id, anchorID, nodeState, nodeDispatch, nodeDragging}: AnchorPorps) {
    const [proximityAnchorPoint, setProximityAnchorPoint] = useState("csv")
    const {nodeSettingsState, nodeSettingsDispatch} = useContext(NodesSettingsStatus)
    const {
        deleteNodeLink
    } = useContext<WorkspaceContextTypes>(WorkSpaceContext)
    const calcProximity = (x: number, y: number) => {
        for (const ids of nodeState[id].acceptedNodes) {
            if (nodeState[ids].anchorPoint) {

                if (
                    Math.abs(0.1 * x - 0.1 * nodeState[ids].anchorPointProperties.x) <
                    2 &&
                    Math.abs(0.1 * y - 0.1 * nodeState[ids].anchorPointProperties.y) < 2
                ) {
                    setProximityAnchorPoint(ids)
                    return true
                }
            }
        }
        return false
    }

    const dragHandle = (e: KonvaEventObject<DragEvent>) => {
        nodeDispatch({
            type: 'updateAnchor',
            nodeID: id,
            anchorID: anchorID,
            value: {
                x: e.target.attrs.x,
                y: e.target.attrs.y,
                anchorDragging: true,
                anchorProximity: calcProximity(e.target.attrs.x, e.target.attrs.y)
            }
        })
    }

    const dragEndHandle = () => {

        if (nodeState[id][anchorID].anchorProximity && proximityAnchorPoint) {
            // nodeDispatch({
            //   type: 'updateNode',
            //   nodeID: id,
            //   value: {
            //     connectedAnchorPoints: [
            //       ...nodeState[id].connectedAnchorPoints,
            //       proximityAnchorPoint
            //     ]
            //   }
            // })
            nodeDispatch({
                type: 'updateAnchor',
                nodeID: id,
                anchorID: anchorID,
                value: {
                    anchorDragging: false,
                    anchorConnected: true,
                    x: nodeState[proximityAnchorPoint]['anchorPointProperties'].x,
                    y: nodeState[proximityAnchorPoint]['anchorPointProperties'].y,
                    connectedNode: proximityAnchorPoint
                }
            })

            let nonTableViewID = ''
            let otherAnchorID = ''
            if (proximityAnchorPoint === 'tableView') {
                if (nodeSettingsState[proximityAnchorPoint].connectedWith !== '') {
                    for (const anchorid of nodeState[nodeSettingsState[proximityAnchorPoint].connectedWith].anchors) {
                        if(nodeState[nodeSettingsState[proximityAnchorPoint].connectedWith][anchorid].connectedNode === 'tableView') {
                            deleteNodeLink(nodeSettingsState[proximityAnchorPoint].connectedWith, anchorid, 'tableView')
                        }
                    }
                }
            }
            for (const key of nodeState[id].anchors) {
                if (nodeState[id][key].connectedNode !== 'tableView' && proximityAnchorPoint !== 'tableView' && nodeState[id][key].connectedNode !== '' && anchorID !== key) {
                    nonTableViewID = nodeState[id][key].connectedNode
                    otherAnchorID = key
                    console.log("tableID",nodeSettingsState[nonTableViewID])
                    deleteNodeLink(id, otherAnchorID, nonTableViewID)
                    if(nodeSettingsState[nonTableViewID].connectedWith !== '' && nodeSettingsState[nonTableViewID].connectedWith !== 'csv'){
                        deleteNodeLink(nodeSettingsState[nonTableViewID].connectedWith, nodeSettingsState[nonTableViewID].connectedAnchorID, nonTableViewID)
                    }
                    for (const anchorid of nodeState[nonTableViewID].anchors) {
                        if (nodeState[nonTableViewID][anchorid]?.connectedNode !== 'tableView' && nodeState[nonTableViewID][anchorid]?.connectedNode !== '') {


                            if (nodeState[nodeState[nonTableViewID][anchorid]?.connectedNode]?.type === 'common') {
                                deleteNodeLink(nonTableViewID, anchorid, nodeState[nonTableViewID][anchorid].connectedNode)
                            }
                        }
                    }
                    // deleteNodeLink(id, anchorID, nodeState[id][key].connectedNode)

                }
            }


            nodeDispatch({type: 'updateAnchorPoint', nodeID: proximityAnchorPoint, value: {connectedNode: id}})
            nodeDispatch({type: 'updateNode', nodeID: id, value: {connected: true}})

            // for (const key of nodeState[id].anchors) {
            //     if(nodeState[id][key].connectedNode !== 'tableView') {
            //         deleteNodeLink(id, anchorID, nodeState[id][key].connectedNode)
            //        break
            //     }
            // }

            nodeSettingsDispatch({
                type: proximityAnchorPoint,
                value: {'connectedWith': id, 'connectedAnchorID': anchorID}
            })
            //   setProximityAnchorPoint(undefined)
        } else {
            nodeDispatch({
                type: 'updateAnchor',
                nodeID: id,
                anchorID: anchorID,
                value: {
                    anchorDragging: false, x: nodeState[id].x + 80,
                    y: nodeState[id].y + 30
                }
            })
        }
    }

    useEffect(() => {
        if (
            nodeState[id][anchorID].anchorConnected && nodeState[nodeState[id][anchorID].connectedNode]
        ) {
            nodeDispatch({
                type: 'updateAnchor',
                nodeID: id,
                anchorID: anchorID,
                value: {
                    x: nodeState[nodeState[id][anchorID].connectedNode]['anchorPointProperties'].x,
                    y: nodeState[nodeState[id][anchorID].connectedNode]['anchorPointProperties'].y
                }
            })
        } else {
            nodeDispatch({
                type: 'updateAnchor',
                nodeID: id,
                anchorID: anchorID,
                value: {x: nodeState[id].x + 80, y: nodeState[id].y + 30}
            })
        }
    }, [nodeState[id][anchorID].anchorConnected, nodeState[nodeState[id][anchorID].connectedNode]?.x, nodeState[nodeState[id][anchorID].connectedNode]?.y, nodeState[id]?.x, nodeState[id]?.y])
    //[nodeState[id][anchorID].anchorConnected, nodeState[nodeState[id][anchorID].connectedNode].x,nodeState[nodeState[id][anchorID].connectedNode].y, nodeState[id].x, nodeState[id].y]
    return (
        <Circle
            id={'anchorPoint_' + id}
            visible={!nodeDragging || nodeState[id][anchorID].anchorConnected && false}
            draggable
            onDragMove={dragHandle}
            onDragEnd={dragEndHandle}
            width={nodeState[id][anchorID].width}
            height={nodeState[id][anchorID].height}
            fill={nodeState[id][anchorID].color}
            x={nodeState[id][anchorID].x}
            y={nodeState[id][anchorID].y}
            stroke="#1e1e1e"
            // strokeWidth={1}
            // stroke={'#ffffff'}
            // strokeEnabled={connected}
        />
    )
}

export default Anchor
