import React from 'react'
import { Rect } from 'react-konva'

type SidebarPorps = {
    width: number,
    height: number
  }

function MainArea({width, height}:SidebarPorps) {
  return (
    <Rect visible={false} width={width - (width * 0.18)} height={height} fill='rgba(255, 255, 255, 0.1)' stroke="#ffffff" x={width - (width * 0.82)}/>
  )
}

export default MainArea