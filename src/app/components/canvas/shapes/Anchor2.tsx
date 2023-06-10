import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect, useState } from 'react'
import { Circle } from 'react-konva'
interface PropsTypes {
  anchorID: string
  nodeID: string
  styles: { width: number; height: number; color: string; x: number; y: number }
  nodes: object
}

export default function Anchor ({
  nodeID,
  anchorID,
  styles,
  nodes,
  setNodes
}: PropsTypes) {
  //   console.log(styles)
  // const [axis,setAxis] = useState({x:0,y:0})
  const [connectedPoint, setConnectedPoint] = useState<string>("csv")
  const calcProximity = (x: number, y: number) => {
    for (const ids of nodes[nodeID].acceptedNodes) {
      if (nodes[ids].anchorPoint) {
        // console.log(nodes[ids].anchorPointProperties)
        if (
          Math.abs(0.1 * x - 0.1 * nodes[ids].x) < 2 &&
          Math.abs((0.1 * y) - (0.1 * (nodes[ids].y + 30))) < 2
        )
          console.log(ids)
          // nodes[nodeID][anchorID].anchorProximity = true
          // setConnectedPoint(ids)
      }
    }
    // return Math.abs(0.1 * nodes[id][anchorID].x - 0.1 * node)
  }
  const dragHandle = (e: KonvaEventObject<DragEvent>) => {
    // setNodes(p => ({
    //   ...p,
    //   [nodeID]: { ...nodes[nodeID],
    //     ...nodes[nodeID].anchorProperties, x: e.target.attrs.x, y: e.target.attrs.y }
    // }))
    setNodes(p => ({
      ...p,
      [nodeID]: {
        ...nodes[nodeID],
        [anchorID]: { ...nodes[nodeID][anchorID], anchorDragging: true }
      }
    }))

    nodes[nodeID][anchorID]['x'] = e.target.attrs.x
    nodes[nodeID][anchorID]['y'] = e.target.attrs.y

    calcProximity(e.target.attrs.x, e.target.attrs.y)
    // if(Math.abs)
  }

  useEffect(() => {
    if (!nodes[nodeID][anchorID].anchorConnected) {
      nodes[nodeID][anchorID]['x'] = nodes[nodeID].x + 80
      nodes[nodeID][anchorID]['y'] = nodes[nodeID].y + 30
    } 
  }, [
    nodes[nodeID].x,
    nodes[nodeID].y,
    nodes[nodeID][anchorID].anchorProximity,
  ])

  useEffect(()=>{
    if(nodes[nodeID][anchorID].anchorConnected){
      nodes[nodeID][anchorID]['x'] = nodes[connectedPoint].x
    nodes[nodeID][anchorID]['y'] = nodes[connectedPoint].y + 30
    }
  },[nodes[connectedPoint].x, nodes[connectedPoint].x, nodes[nodeID][anchorID].anchorConnected])

  // console.log(nodes[nodeID].x, nodes[nodeID].y, nodes)
  // const nodeDrag = () => {
  //   if (!nodes[nodeID].anchorDraggin) {
  //     // return { x: nodes[nodeID].anchorProperties.x, y: nodes[nodeID].anchorProperties.y}
  //   // } else {
  //     return { x: nodes[nodeID].x + 80, y: nodes[nodeID].y + 30 }
  //   }
  // }
  // console.log(nodes)
  return (
    <Circle
      id={'anchor_' + anchorID}
      draggable
      onDragStart={() => {
        // setDragging(!draggin)
        // setNodes(p => ({
        //   ...p,
        //   [nodeID]: { ...nodes[nodeID],
        //     [anchorID]: {...nodes[nodeID][anchorID], anchorConnected:true},  }
        // }))
      }}
      onDragMove={dragHandle}
      onDragEnd={() => {
        if(nodes[nodeID][anchorID].anchorProximity) {
          nodes[nodeID][anchorID].anchorConnected = true
          nodes[nodeID][anchorID]['x'] = nodes[connectedPoint].x
          nodes[nodeID][anchorID]['y'] = nodes[connectedPoint].y + 30
        }
        // setDragging(!draggin)
        // setNodes(p => ({
        //     ...p,
        //     [nodeID]: { ...nodes[nodeID], anchorDraggin: false }
        //   }))
      }}
      width={styles.width}
      height={styles.height}
      fill={styles.color}
      x={nodes[nodeID][anchorID].x}
      y={nodes[nodeID][anchorID].y}
      //   strokeWidth={1}
      stroke={'#ffffff'}
      // strokeEnabled={connected}
    />
  )
}
