import React, { useContext, useEffect } from 'react'
import { Group, Line, Rect, Text } from 'react-konva'
import Node from './shapes/Node'
import NodeStatic from './shapes/NodeStatic'
import { WorkSpaceContext } from './Workspace'

type SidebarPorps = {
  width: number
  height: number
}

function Sidebar ({ width, height }: SidebarPorps) {
  const {nodeState,nodeDispatch} = useContext(WorkSpaceContext)
  // console.log(width, height)
  useEffect(() => {
    const widthMax = width * (55 / (width - width * 0.82))
    // console.log(width * (100 / widthMax) / 2)
    Object.keys(nodeState).forEach((v, i) => {
      const x = i % 2 === 0 ? widthMax / 1.78 : widthMax / 5
      const y =
        Math.floor(i / 2) * (height * (20 / (height - height * 0.8))) + 100
      nodeDispatch({
        type: 'updateNode',
        nodeID: v,
        value: { x: x, y: y, staticX: x, staticY: y }
      })
    })
  }, [height, width])
  return (
    <>
      <Group id='common'>
        <Rect width={width - width * 0.82} height={height} fill='#131313' />
        <Line
          width={1}
          height={height}
          stroke='#FFCDB2'
          points={[0, 0, 0, height]}
          x={width - width * 0.82}
          y={0}
        />
        <Group x={width - width * 0.99} y={height - height * 0.98}>
          <Rect
            fill='#1e1e1e'
            x={0}
            y={0}
            width={width - width * 0.84}
            height={height - height * 0.95}
            cornerRadius={10}
          />
          <Text
            text='Common Nodes'
            fill='#ffffff'
            x={width - width * 0.982}
            y={height - height * 0.989}
            fontSize={height + width - (height + width) * 0.989}
          />
        </Group>

        {nodeState &&
          Object.keys(nodeState).map(v => (
            <>
              {/* <Group draggable> */}
              <NodeStatic id={v} draggable={false} />
              <Node id={v} />
              {/* </Group> */}
            </>
          ))}
      </Group>
    </>
  )
}

export default Sidebar
