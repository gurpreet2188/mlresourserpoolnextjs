import { LinkPorps } from '@/app/interface/types'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Line } from 'react-konva'

function Link ({ id, nodeState, anchorID, setDeleteLink }: LinkPorps) {
  const [points, setPoints] = useState<Array<number>>()
  const [selected, setSelected] = useState(false)
  // const lineWorker = new Worker(new URL('./lineWorker.ts', import.meta.url))
 
  
  // useEffect(()=>{
    
    
  //   return ()=> {
  //     lineWorker.terminate()
  //   }
  // },[])
  
  useEffect(() => {
    // const updatedPoints = {
    //   x1: nodeState[id].anchorBaseProperties.x, y1: nodeState[id].anchorBaseProperties.y,
    //   x2: nodeState[id][anchorID].x, y2: nodeState[id][anchorID].y
    // }
    // lineWorker.postMessage({updatedPoints})
    // lineWorker.addEventListener('message', (e)=>{
    //   const {calcPoints} = e.data
    //   setPoints(calcPoints)
    //   console.log(calcPoints)
    // })
    setPoints([
      0,
      0,
      Math.abs(
        nodeState[id].anchorBaseProperties.x - nodeState[id][anchorID].x
      ) / 2,
      0,
      Math.abs(
        nodeState[id].anchorBaseProperties.x - nodeState[id][anchorID].x
      ) / 2,
      nodeState[id][anchorID].y - nodeState[id].anchorBaseProperties.y,
      nodeState[id][anchorID].x - nodeState[id].anchorBaseProperties.x,
      nodeState[id][anchorID].y - nodeState[id].anchorBaseProperties.y
    ])

    // return ()=> {
    //   lineWorker.terminate()
    // }
  }, [
    nodeState[id][anchorID].y,
    nodeState[id][anchorID].x,
    nodeState[id].anchorBaseProperties.y,
    nodeState[id].anchorBaseProperties.x
  ])

  const clickHandle = (e: KonvaEventObject<MouseEvent>) => {
    setSelected(!selected)
    if(selected){
      setDeleteLink({ nodeID: id, anchorID: anchorID, connectedWith: nodeState[id][anchorID].connectedNode })
    }else {
      setDeleteLink({ nodeID: "", anchorID: "", connectedWith: "" })
    }

    // console.log('click')
  }

  useEffect(() => {
    if (selected) {
      setDeleteLink({ nodeID: id, anchorID: anchorID, 'connectedWith': nodeState[id][anchorID].connectedNode })
    } else {
      setDeleteLink({ nodeID: "", anchorID: "" })
    }
  }, [selected])

  useEffect(()=>{
    if(!nodeState[id][anchorID].anchorConnected) {
      setSelected(false)
    }
  },[nodeState[id][anchorID].anchorConnected])

  return (
    <Line
      id={'link_' + id}
      visible={
        nodeState[id][anchorID].anchorDragging ||
        nodeState[id][anchorID].anchorConnected
      }
      bezier
      onClick={clickHandle}
      onTouchStart={clickHandle}
      x={nodeState[id].anchorBaseProperties.x}
      y={nodeState[id].anchorBaseProperties.y}
      points={points}
      stroke={selected ? "#a0a0a0" : "#ffffff"}
      strokeWidth={selected ? 8 : 6}
    />
  )
}

export default memo(Link)



// function lineWorker () {
//  self.addEventListener('message', (e)=> {
//   const {x1,y1,x2,y2} = e.data
//   const calcPoints = [
//     0,
//     0,
//     Math.abs(
//       x1 - x2
//     ) / 2,
//     0,
//     Math.abs(
//       x1 - x2
//     ) / 2,
//     y2 - y1,
//     x2 - x1,
//     y2 - y1
//   ]
//   self.postMessage(calcPoints)
//  })


// }
