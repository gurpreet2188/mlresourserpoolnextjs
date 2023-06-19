import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { Group, Text } from 'react-konva'
import NodeRect from './NodeRect'
// import AnchorBase from './AnchorBase'
import Anchor from './Anchor'
import { KonvaEventObject } from 'konva/lib/Node'
import Link from './Link'
import AnchorPoint from './AnchorPoint'
import { WorkSpaceContext } from '../Workspace'
import { WorkspaceContextTypes } from '@/app/interface/types'
import ImageIcon from './Image'
import AnchorBase from './AnchorBase'
// import calculateProximity from '@/app/helpers/calculateProximity'

type NodeProps = {
  id: string
}

function Node ({ id }: NodeProps) {
  const nodeRef = useRef(null)
  const [nodeDraggin, setNodeDragging] = useState(false)
  const {
    nodeState,
    nodeDispatch,
    setDeleteLink,
    workspaceArea,
    setWorkspaceArea
  } = useContext<WorkspaceContextTypes>(WorkSpaceContext)

  const nodeDragHandleStart = () => {
    setNodeDragging(true)
  }

  const nodeDragHandle = (e: KonvaEventObject<DragEvent>) => {
    const newXY = { x: e.target.attrs.x, y: e.target.attrs.y }
    nodeDispatch({ type: 'updateNode', nodeID: id, value: newXY })
    nodeDispatch({
      type: 'updateAnchorBase',
      nodeID: id,
      value: { x: newXY.x + 80, y: newXY.y + 30 }
    })

    nodeState[id].anchorPoint &&
      nodeDispatch({
        type: 'updateAnchorPoint',
        nodeID: id,
        value: { x: newXY.x, y: newXY.y + 30 }
      })

    if (!nodeState[id].active) {
      if (0.1 * workspaceArea.x - 0.1 * e.target.attrs.x <= 1) {
        setWorkspaceArea({ ...workspaceArea, hit: true })
      } else {
        setWorkspaceArea({ ...workspaceArea, hit: false })
      }
    }
  }

  const nodeDragHandleEnd = (e: KonvaEventObject<DragEvent>) => {
    if (!nodeState[id].active) {
      if (workspaceArea.hit) {
        nodeDispatch({
          type: 'updateNode',
          nodeID: id,
          value: { active: true }
        })
        setWorkspaceArea({ ...workspaceArea, hit: false })
      } else {
        nodeDispatch({
          type: 'updateNode',
          nodeID: id,
          value: { x: nodeState[id].staticX, y: nodeState[id].staticY }
        })
      }
    }
    setNodeDragging(false)
    // e.target.clearCache()
  }

  // useEffect(() => {
  //   if (nodeState[id].connectedAnchorPoints.length === 0) {
  //     nodeDispatch({
  //       type: 'updateNode',
  //       nodeID: id,
  //       value: { connected: false }
  //     })
  //   }
  // }, [nodeState[id].connectedAnchorPoints.length])
  return (
    <>
      <Group
        id={id}
        draggable
        ref={nodeRef}
        x={nodeState[id].x}
        y={nodeState[id].y}
        onDragStart={nodeDragHandleStart}
        onDragMove={nodeDragHandle}
        onDragEnd={nodeDragHandleEnd}
      >
        <NodeRect
          id={id}
          color={nodeState[id].nodeColor}
          styles={nodeState[id].nodeRectProperties}
        />

        {!nodeDraggin && (
          <ImageIcon
            id={id}
            iconName={nodeState[id].icon}
            active={nodeState[id].active}
          />
        )}
        {nodeState[id].anchorPoint && nodeState[id].active && (
          <AnchorPoint id={id} styles={nodeState[id].anchorPointProperties} />
        )}

        {nodeState[id].anchors.length > 0 &&
        nodeState[id].active &&
        nodeDraggin ? (
          <AnchorBase id={id} styles={nodeState[id].anchorBaseProperties} />
        ) : (
          <></>
        )}
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
            <Link
              id={id}
              anchorID={v}
              nodeState={nodeState}
              setDeleteLink={setDeleteLink}
            />
            <Anchor
              id={id}
              anchorID={v}
              nodeState={nodeState}
              nodeDispatch={nodeDispatch}
              nodeDragging={nodeDraggin}
            />
          </>
        ))}
    </>
  )
}

export default memo(Node)
