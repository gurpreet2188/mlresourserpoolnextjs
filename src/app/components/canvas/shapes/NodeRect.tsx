import React from 'react'
import { Rect } from 'react-konva'
interface PropsTypes {
  id: string
  color: string
  styles: {width:number, height:number, cornerRadius:Array<number>}
  selected:boolean
  clickhandle: ()=>{}
}
function NodeRect ({ id, color, styles, selected, clickhandle }: PropsTypes) {
  return (
    <Rect
      id={'base_' + id}
      width={styles.width}
      height={styles.height}
      fill={color}
      x={0}
      y={0}
      cornerRadius={styles.cornerRadius}
      strokeEnabled={selected}
      stroke="#ffffff"
      strokeWidth={4}
      onClick={clickhandle}
    ></Rect>
  )
}

export default NodeRect
