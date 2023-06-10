'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Widgets } from './Sidebar'
import { WidgetProps } from '../interface/types'

function Workspace () {
  const [dropPlace, setDropPlace] = useState(Array<WidgetProps>)
  const canvasRef = useRef(null)

  // const [{ isOver }, dropRef] = useDrop({
  //   accept: 'widget',
  //   drop: item =>
  //     setDropPlace(!dropPlace.includes(item) && [...dropPlace, item]),

  //   collect: monitor => ({
  //     isOver: monitor.isOver()
  //   })
  // })

  // useEffect(()=>{
  //   console.log(canvasRef)
  //   const canvas = canvasRef.current
  //   const ctx = canvas.getContext("2d")
  //   ctx.rect(20, 20, 150, 100)
  //   ctx.stroke()
  // },[dropPlace])
  // console.log(dropPlace, isOver)
  return (
    // <div className='flex flex-col'>
    <>
      <canvas
        // ref={dropRef}
        className='bg-gray-700 w-[100%] h-[100%] relative text-white'
      >
        {/* {dropPlace.map((item, index) => (
          <Widgets
            key={item.id + index}
            id={item.id}
            name={item.name}
            bgColor={item.bgColor}
          />
        ))} */}
        {/* {isOver && 'drophere'} */}
      </canvas>

      <div
        // ref={dropRef}
        className='bg-white-700/25 w-[100%] h-[100%] relative text-white border border-white'
        style={{}}
      >
        {/* {isOver && 'drophere'} */}
      </div>
    </>
    // </div>
  )
}
export default Workspace
