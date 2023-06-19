import React, { useContext, useEffect, useState } from 'react'
import { Group, Image, Line, Rect, Text } from 'react-konva'
import Node from './shapes/Node'
import NodeStatic from './shapes/NodeStatic'
import { WorkSpaceContext } from './Workspace'
import { WorkspaceContextTypes } from '@/app/interface/types'
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'
import { svgIcon } from './shapes/Image'
import { Image as KonvaImage } from 'react-konva'

type SidebarPorps = {
  width: number
  height: number
}

function Sidebar ({ width, height }: SidebarPorps) {
  const [sideBar, setSidebar] = useState({ width: 300, height: height })
  const [sideBarAccess, setSideBarAccess] = useState(false)
  const { workspaceArea, setWorkspaceArea, nodeState, nodeDispatch } =
    useContext<WorkspaceContextTypes>(WorkSpaceContext)

  // useEffect(() => {
  //   nodeDispatch({ type: 'updateNodeRectProperties', width: sideBar.width <=150 ? 40 , height: 60 })
  // }, [sideBar.width])

  useEffect(() => {
    const tempSideBarWidth = width < 1000 ? 301 : 300

    setSidebar({ width: tempSideBarWidth, height: height })

    Object.keys(nodeState).forEach((v, i) => {
      const x = i % 2 === 0 ? tempSideBarWidth / 2 : tempSideBarWidth / 10
      // const y =  i % 2 === 0 ? (nodeState[v].type === 'common' ? 100 : 350): (nodeState[v].type === 'common' ? 100 : 350)
      // const y =
      //   Math.floor(i / 2) * (height * (20 / (height - height * 0.8))) +
      //   (nodeState[v].type === 'common' ? 80 : 160)
      if (!nodeState[v].active) {
        nodeDispatch({
          type: 'updateNode',
          nodeID: v,
          value: { x: x,  staticX: x, }
        })
      }
    })
    setWorkspaceArea({ hit: false, x: tempSideBarWidth, y: height })
  }, [height, width])

  useEffect(() => {
    setSideBarAccess(sideBar.width < 300 ? true : false)
  }, [sideBar.width])

  const category = (name: string, x: number, y: number) => (
    <>
      <Group x={sideBar.width / 20} y={y}>
        <Rect
          fill='#333333'
          x={0}
          y={0}
          width={sideBar.width - 70}
          height={sideBar.width > 300 ? 40 : 50}
          cornerRadius={10}
        />
        <Text
          text={name}
          fill='#ffffff'
          align='center'
          x={sideBar.width - sideBar.width * 0.96}
          y={sideBar.width > 300 ? 14 : 18}
          fontSize={sideBar.width > 300 ? 15 : 20}
        />
      </Group>
    </>
  )
  // sideBar.width > 300 ? -(sideBar.width - 50) : 0
  // console.log(svgIcon(MdChevronLeft))
  const sideBarAccessClickHandle = () => {
    setSideBarAccess(!sideBarAccess)
    // console.log('click')
  }
  // visible={sideBar.width > 300}
  return (
    <Group
      x={sideBar.width < 300 ? 0 : sideBar.width > 300 ? !sideBarAccess ? -(sideBar.width - 50) : 0: 0}
    >
      <Rect width={sideBar.width} height={sideBar.height} />
      <Line
        width={1}
        height={height}
        stroke='#FFCDB2'
        points={[0, 0, 0, height]}
        x={sideBar.width}
        y={0}
      />
      {category('Common Nodes', 0.99, 35)}
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
      {category('Machine learning', 0.99, sideBar.width > 300? 315 : 310)}
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
      {sideBar.width > 300 && (
        <KonvaImage
          onClick={sideBarAccessClickHandle}
          onTouchStart={sideBarAccessClickHandle}
          onTou
          width={24}
          height={24}
          x={sideBar.width - 30}
          y={10}
          fill='#ffffff'
          cornerRadius={50}
          image={
            sideBarAccess ? svgIcon(MdChevronLeft) : svgIcon(MdChevronRight)
          }
        />
      )}
    </Group>
  )
}

export default Sidebar
