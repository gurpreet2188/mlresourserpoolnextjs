import React, { useContext, useEffect, useRef } from 'react'
import { Group, Text } from 'react-konva'
import NodeRect from './NodeRect'
import { WorkSpaceContext } from '../Workspace'
import { WorkspaceContextTypes } from '@/app/interface/types'
import ImageIcon from './Image'

type NodeProps = {
  id: string
}

function NodeStatic ({ id }: NodeProps) {
  const { nodeState } = useContext<WorkspaceContextTypes>(WorkSpaceContext)

  return (
    <>
      <Group
        id={'static_' + id}
        x={nodeState[id].staticX}
        y={nodeState[id].staticY}
      >
        <NodeRect
          id={id}
          color={nodeState[id].nodeColor}
          styles={nodeState[id].nodeRectProperties}
        />

        <ImageIcon
          iconName={nodeState[id].icon}
          active={nodeState[id].active}
        />
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
