import React, { useContext, useEffect, useState } from 'react'
import { Group, Line, Rect, Text } from 'react-konva'
import Node from './shapes/Node'
import NodeStatic from './shapes/NodeStatic'
import { WorkSpaceContext } from './Workspace'
import { WorkspaceContextTypes } from '@/app/interface/types'

type SidebarPorps = {
  width: number
  height: number
}

function Sidebar ({ width, height }: SidebarPorps) {
  const { workspaceArea, setWorkspaceArea, nodeState, nodeDispatch } = useContext< WorkspaceContextTypes>(WorkSpaceContext)
  useEffect(() => {
    const widthMax = width * (55 / (width - width * 0.82))

    Object.keys(nodeState).forEach((v, i) => {
      const x = i % 2 === 0 ? widthMax / 1.78 : widthMax / 5
      const y =
        Math.floor(i / 2) * (height * (20 / (height - height * 0.8))) + (nodeState[v].type === 'common' ? 80 : 160)
      if(!nodeState[v].active) {
        nodeDispatch({
          type: 'updateNode',
          nodeID: v,
          value: { x: x, y: y, staticX: x, staticY: y }
        })
      }
    })

    setWorkspaceArea({hit:false, x: width - (width * 0.82), y: height})
  }, [height, width])

  const category = (name: string, x: number, y: number) => (
    <>
      <Group x={width - width * x} y={height - height * y}>
        <Rect
          fill='#1e1e1e'
          x={0}
          y={0}
          width={width - width * 0.84}
          height={height - height * 0.95}
          cornerRadius={10}
        />
        <Text
          text={name}
          fill='#ffffff'
          x={width - width * 0.989}
          y={height - height * 0.982}
          fontSize={height + width - (height + width) * 0.993}
        />
      </Group>
    </>
  )

  return (
    <>
      <Rect width={width - width * 0.82} height={height} fill='#131313' />
      <Line
        width={1}
        height={height}
        stroke='#FFCDB2'
        points={[0, 0, 0, height]}
        x={width - width * 0.82}
        y={0}
      />
      {category('Common Nodes', 0.99, 0.98)}
      {nodeState &&
        Object.keys(nodeState).map(v => (
          <>
            {nodeState[v].type === 'common' && (
              <Group key={v}>
                <NodeStatic id={v} />
                <Node id={v} />
              </Group>
            )}
          </>
        ))}
      {category('Machine learning', 0.99, 0.68)}
      {nodeState &&
        Object.keys(nodeState).map(v => (
          <>
            {nodeState[v].type === 'machineLearning' && (
              <Group key={v}>
                <NodeStatic id={v} />
                <Node id={v} />
              </Group>
            )}
          </>
        ))}
    </>
  )
}

export default Sidebar
