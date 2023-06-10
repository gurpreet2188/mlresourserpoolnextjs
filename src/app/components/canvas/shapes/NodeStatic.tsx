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
  draggable: boolean
}

function NodeStatic ({ id, draggable }: NodeProps) {
  const { nodeState} =
    useContext<WorkspaceContextTypes>(WorkSpaceContext)

  return (
    <>
      <Group
        id={draggable ? id : id + 'default'}
        draggable={draggable}
        // onDragEnd={nodeDragHandleEnd}
        x={draggable ? nodeState[id].x : nodeState[id].staticX}
        y={draggable ? nodeState[id].y : nodeState[id].staticY}
        // onDragMove={nodeDragHandle}
      >
        <NodeRect
          id={id}
          color={nodeState[id].nodeColor}
          styles={nodeState[id].nodeRectProperties}
        />

        <ImageIcon iconName={nodeState[id].icon} />
        <Text
          text={nodeState[id].name}
          y={nodeState[id].nodeRectProperties.height + 10}
          x={0}
          fill={'#ffffff'}
        />
      </Group>
    </>
  )
}

export default NodeStatic
