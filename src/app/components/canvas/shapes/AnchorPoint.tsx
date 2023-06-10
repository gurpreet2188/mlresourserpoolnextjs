import { nodePorperties } from '@/app/nodes/config'
import React from 'react'
import { Circle } from 'react-konva'

interface PropsTypes {
  id: string
  styles: { width: number; height: number; color: string; x: number; y: number }
}

function AnchorPoint ({ id, styles }: PropsTypes) {
  // const dimensions = nodePorperties.anchor.size
  // const offset = nodePorperties.rect.size
  return (
    <Circle
      id={'anchorPoint_' + id}
      width={styles.width}
      height={styles.height}
      fill={styles.color}
      x={0}
      y={30}
      // strokeWidth={1}
      // stroke={'#ffffff'}
      // strokeEnabled={connected}
    />
  )
}

export default AnchorPoint
