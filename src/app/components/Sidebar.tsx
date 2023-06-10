'use client'
import React, { useEffect } from 'react'
import { WidgetProps } from '../interface/types'
import { useDrag } from 'react-dnd'

export function Sidebar () {
  const commonWidgets: Array<WidgetProps> = [
    { name: 'CSV Loader', id: 'c1', bgColor: '#212121' },
    { name: 'TableView', id: 'c2', bgColor: '#212121' }
  ]

  // useEffect(()=>{
  //   const f = async () =>{
  //     const res = await fetch('/api/test')
  //     const data = await res.json()
  //     console.log(data)
  //   }

  //   f()
  // },[])

  return (
    <div className=' flex flex-col self-start bg-slate-600 h-[100%] w-[20%] text-white'>
      <div className='flex flex-col gap-[1rem]'>
        <h2>Common Widgets</h2>
        <div className='flex flex-wrap gap-[1rem]'>
          {commonWidgets.map((v, i) => (
            <Widgets key={i} name={v.name} id={v.id} bgColor={v.bgColor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Widgets ({ name, id, bgColor }: WidgetProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type:'widget',
    item: {name,id,bgColor},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  return (
    <div
      ref={dragRef}
      className='p-[1rem] bg-slate-400 rounded-2xl absolute'
      style={{ backgroundColor: bgColor }}
    >
      {name}
      {isDragging}
    </div>
  )
}


