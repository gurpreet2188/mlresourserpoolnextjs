import React from 'react'
import { Rect } from 'react-konva'
interface PropsTypes {
  id: string
  color: string
  styles: {width:number, height:number, cornerRadius:Array<number>}
}
function NodeRect ({ id, color, styles }: PropsTypes) {
  return (
    <Rect
      id={'base_' + id}
      width={styles.width}
      height={styles.height}
      fill={color}
      x={0}
      y={0}
      cornerRadius={styles.cornerRadius}
    ></Rect>
  )
}

export default NodeRect
