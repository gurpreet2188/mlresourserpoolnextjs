import React from 'react'
import { Circle } from 'react-konva'

interface PropsTypes {
  id: string
  styles: { width: number; height: number; color: string; x: number; y: number }

}

function AnchorBase ({ id, styles}: PropsTypes) {
  return (
    <Circle
      id={'anchorBase_' + id}
      width={styles.width}
      height={styles.height}
      fill={styles.color}
      x={80}
      y={30}
      // strokeWidth={1}
      // stroke={'#ffffff'}
      // strokeEnabled={connected}
    />
  )
}

export default AnchorBase
