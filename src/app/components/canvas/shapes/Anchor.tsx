import { AnchorPorps } from '@/app/interface/types'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect, useState } from 'react'
import { Circle } from 'react-konva'



function Anchor ({ id, anchorID, nodeState, nodeDispatch }: AnchorPorps) {
  const [proximityAnchorPoint, setProximityAnchorPoint] = useState("csv")


  const calcProximity = (x: number, y: number) => {
    for (const ids of nodeState[id].acceptedNodes) {
      if (nodeState[ids].anchorPoint) {
       
        if (
          Math.abs(0.1 * x - 0.1 * nodeState[ids].anchorPointProperties.x) <
            2 &&
          Math.abs(0.1 * y - 0.1 * nodeState[ids].anchorPointProperties.y) < 2
        ) {
          // console.log(ids)
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

  const dragEndHandle = (e: KonvaEventObject<DragEvent>) => {

    if (nodeState[id][anchorID].anchorProximity && proximityAnchorPoint) {
      nodeDispatch({
        type: 'updateNode',
        nodeID: id,
        value: {
          connectedAnchorPoints: [
            ...nodeState[id].connectedAnchorPoints,
            proximityAnchorPoint
          ]
        }
      })
      nodeDispatch({
        type: 'updateAnchor',
        nodeID: id,
        anchorID: anchorID,
        value: {
          anchorDragging: false,
          anchorConnected: true,
          x: nodeState[proximityAnchorPoint]['anchorPointProperties'].x,
          y: nodeState[proximityAnchorPoint]['anchorPointProperties'].y
        }
      })
      //   setProximityAnchorPoint(undefined)
    } else {
      nodeDispatch({
        type: 'updateAnchor',
        nodeID: id,
        anchorID: anchorID,
        value: { anchorDragging: false, x: nodeState[id].x + 80,
        y: nodeState[id].y + 30 }
      })
    }
  }

  useEffect(() => {
    if (
      nodeState[id][anchorID].anchorConnected &&
      nodeState[id].connectedAnchorPoints.length > 0 && nodeState[proximityAnchorPoint]
    ) {
        nodeDispatch({
            type: 'updateAnchor',
            nodeID: id,
            anchorID: anchorID,
            value: {
              x: nodeState[proximityAnchorPoint]['anchorPointProperties'].x,
              y: nodeState[proximityAnchorPoint]['anchorPointProperties'].y
            }
          })
    } else {
        nodeDispatch({
            type: 'updateAnchor',
            nodeID: id,
            anchorID: anchorID,
            value: { x: nodeState[id].x + 80, y: nodeState[id].y + 30 }
          })
    }
  }, [nodeState[id][anchorID].anchorConnected, nodeState[proximityAnchorPoint].x,nodeState[proximityAnchorPoint].y, nodeState[id].x, nodeState[id].y])
  return (
    <Circle
      id={'anchorPoint_' + id}
      draggable
      onDragMove={dragHandle}
      onDragEnd={dragEndHandle}
      width={nodeState[id][anchorID].width}
      height={nodeState[id][anchorID].height}
      fill={nodeState[id][anchorID].color}
      x={nodeState[id][anchorID].x}
      y={nodeState[id][anchorID].y}
      // strokeWidth={1}
      // stroke={'#ffffff'}
      // strokeEnabled={connected}
    />
  )
}

export default Anchor
