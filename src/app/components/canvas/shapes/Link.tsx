import { LinkPorps } from '@/app/interface/types'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-konva'

function Link ({ id, nodeState, anchorID, setDeleteLink }: LinkPorps) {
  const [points, setPoints] = useState<Array<number>>()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
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
  }, [
    nodeState[id][anchorID].y,
    nodeState[id][anchorID].x,
    nodeState[id].anchorBaseProperties.y,
    nodeState[id].anchorBaseProperties.x
  ])

  const clickHandle = (e: KonvaEventObject<MouseEvent>) => {
    setSelected(!selected)

    console.log('click')
  }

  useEffect(() => {
    setDeleteLink(
      selected
        ? { nodeID: id, anchorID: anchorID }
        : { nodeID: '', anchorID: '' }
    )
  }, [selected])

  return (
    <Line
      id={'link_' + id}
      visible={
        nodeState[id][anchorID].anchorDragging ||
        nodeState[id][anchorID].anchorConnected
      }
      bezier
      onClick={clickHandle}
      x={nodeState[id].anchorBaseProperties.x}
      y={nodeState[id].anchorBaseProperties.y}
      points={points}
      stroke={'#ffffff'}
      strokeWidth={4}
    />
  )
}

export default Link
