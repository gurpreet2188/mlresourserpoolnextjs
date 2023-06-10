import React, { useContext, useEffect } from 'react'
import { Group, Text } from 'react-konva'
import NodeRect from './NodeRect'
import AnchorBase from './AnchorBase'
import Anchor from './Anchor'
import { KonvaEventObject } from 'konva/lib/Node'
import Link from './Link'
import AnchorPoint from './AnchorPoint'
import { WorkSpaceContext } from '../Workspace'
import { WorkspaceContextTypes } from '@/app/interface/types'
import ImageIcon from './Image'

type NodeProps = {
  id: string
}

function Node ({ id }: NodeProps) {
  const { nodeState, nodeDispatch, setDeleteLink } =
    useContext<WorkspaceContextTypes>(WorkSpaceContext)

  const nodeDragHandle = (e: KonvaEventObject<DragEvent>) => {
    const newXY = { x: e.target.attrs.x, y: e.target.attrs.y }
    nodeDispatch({ type: 'updateNode', nodeID: id, value: newXY })
    nodeDispatch({
      type: 'updateAnchorBase',
      nodeID: id,
      value: { x: newXY.x + 80, y: newXY.y + 30 }
    })
    nodeDispatch({
      type: 'updateAnchorPoint',
      nodeID: id,
      value: { x: newXY.x, y: newXY.y + 30 }
    })
  }

  const nodeDragHandleEnd = () => {
    setTimeout(() => {
      nodeDispatch({ type: 'updateNode', nodeID: id, value: { active: true } })
    }, 500)
  }


  return (
    <>
      <Group
        id={id}
        draggable
        onDragEnd={nodeDragHandleEnd}
        x={nodeState[id].x}
        y={nodeState[id].y}
        onDragMove={nodeDragHandle}
      >
        <NodeRect
          id={id}
          color={nodeState[id].nodeColor}
          styles={nodeState[id].nodeRectProperties}
        />

        <ImageIcon iconName={nodeState[id].icon} />
        {nodeState[id].anchorPoint && nodeState[id].active && (
          <AnchorPoint id={id} styles={nodeState[id].anchorPointProperties} />
        )}
        {(nodeState[id].acceptedNodes.length > 0 && nodeState[id].active) ? 
          <AnchorBase
            id={id}
            styles={nodeState[id].anchorBaseProperties}
            
          />
        : <></>}
        <Text
          text={nodeState[id].name}
          y={nodeState[id].nodeRectProperties.height + 10}
          x={0}
          fill={'#ffffff'}
        />
      </Group>
      {nodeState[id].active &&
        nodeState[id].anchors.map((v: string) => (
          <>
            <Anchor
              id={id}
              anchorID={v}
              nodeState={nodeState}
              nodeDispatch={nodeDispatch}
            />
            <Link id={id} anchorID={v} nodeState={nodeState} setDeleteLink={setDeleteLink } />
          </>
        ))}
    </>
  )
}

export default Node
