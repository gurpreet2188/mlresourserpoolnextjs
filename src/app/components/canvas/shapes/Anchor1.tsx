import { nodePorperties } from '@/app/nodes/config'
import React, { useContext, useEffect, useState } from 'react'
import { Circle } from 'react-konva'
import { AnchorsXYContext } from '../Workspace'
import { KonvaEventObject } from 'konva/lib/Node'

interface PropsTypes {
  color: string
  axis: { x: number; y: number }
  id: string
}

function Anchor ({ color, axis, id }: PropsTypes) {
  const { anchorXY, setAnchorXY, setAnchorPointXY, anchorPointXY } =
    useContext(AnchorsXYContext)
  const [anchorDragging, setAnchorDragging] = useState(false)
  const dimensions = nodePorperties.anchor.size
  const offset = nodePorperties.rect.size
  const [proximity, setProximity] = useState(false)
  const [connectingAnchor, setConnectingAnchor] = useState([])
  const anchorDraghandle = (e: KonvaEventObject<DragEvent>) => {
    const x = e.target.attrs.x
    const y = e.target.attrs.y
    // console.log('test1', anchorPointXY[id].acceptedNodes)
    let connectingAnchorIds = []
    if (anchorPointXY[id].acceptedNodes.length > 0) {
      for (const ids of anchorPointXY[id].acceptedNodes) {
        console.log(
          'test1',
          anchorXY[id]?.x,
          anchorPointXY[ids]?.x,
          Math.abs(0.1 * anchorXY[id]?.x - 0.1 * anchorPointXY[ids]?.x),
          Math.abs(0.1 * anchorXY[id]?.y - 0.1 * anchorPointXY[ids]?.y)

        )
        if (
          Math.abs(0.1 * anchorXY[id]?.x - 0.1 * anchorPointXY[ids]?.x) < 2 &&
        Math.abs(0.1 * anchorXY[id]?.y - 0.1 * anchorPointXY[ids]?.y) < 2
        ) {
          setProximity(true)
          setConnectingAnchor([...connectingAnchor, ids])
            // console.log("checking", id," is near", ids)
        }
        // if(ids )
        // console.log("test1", ids)
        // if(ids === id) {
        // console.log("test1",anchorPointXY[ids].x, anchorPointXY[ids].y)
        // }
      }
    }
    if (!anchorXY[id].proximity) {
      const newXY = {
        [id]: {
          x: e.target.attrs.x,
          y: e.target.attrs.y,
          connected: anchorXY[id].connected,
          connectedID: anchorXY[id].connectedID,
          acceptedNodes: anchorXY[id].acceptedNodes
        }
      }
      setAnchorXY(p => ({ ...p, ...newXY }))
    }
  }
  return (
    <Circle
      id={'anchor_' + id}
      draggable={!anchorXY[id].connected}
      onDragMove={anchorDraghandle}
      onDragStart={() => setAnchorDragging(true)}
      onDragEnd={() => {
        // console.log('test1', anchorXY)
        if (!proximity) {
          setAnchorDragging(false)
          const resetXY = {
            [id]: {
              x: axis.x + offset.w,
              y: axis.y + offset.h / 2,
              proximity: false,
              connected: false,
              connectedID: anchorXY[id].connectedID
            }
          }
          setAnchorXY(p => ({ ...p, ...resetXY }))
        } else if (proximity) {
          console.log('end', anchorPointXY)
          setAnchorDragging(false)
          let newAnchor = {}
          for (const ids of connectingAnchor) {
            newAnchor = {
              ...newAnchor,
              [id]: {
                x: anchorPointXY[ids].x,
                y: anchorPointXY[ids].y,
                connected: true,
                connectedID: [...anchorXY[id].connectedID, ids],
                acceptedNodes: anchorXY[id].acceptedNodes
              }
            }
          }
          // const connectedXY = {
          //   [id]: {
          //     x: anchorPointXY[id].x,
          //     y: anchorPointXY[id].y,
          //     proximity: true,
          //     connected: true,
          //     connectedID: anchorXY[id].connectedID
          //   }
          setAnchorXY(p => ({ ...p, ...newAnchor }))
        }
        // if (anchorPointXY[id].connectedID.lenth > 0) {
        // let newAnchor = {}
        // for (const ids of anchorPointXY[id].connectedID) {
        //   newAnchor = {
        //     ...newAnchor,
        //     [ids]: {
        //       x: anchorPointXY[ids].x,
        //       y: anchorPointXY[ids],
        //       connected: true,
        //       connectedID: [...anchorPointXY[ids].conenctedID],
        //       id
        //     }
        //   }
        // }
        // setAnchorPointXY(p => ({ ...p, ...newAnchor }))

        // }
        // }
      }}
      width={dimensions.w}
      height={dimensions.h}
      fill={'#ffffff'}
      x={
        anchorDragging
          ? anchorXY[id]
            ? anchorXY[id].x
            : axis.x + offset.w
          : axis.x + offset.w
      }
      y={
        anchorDragging
          ? anchorXY[id]
            ? anchorXY[id].y
            : axis.y + offset.h / 2
          : axis.y + offset.h / 2
      }
    />
  )
}

export default Anchor
