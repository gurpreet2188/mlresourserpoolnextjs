'use client'
// import Konva from 'konva'
import React, { useEffect, useState } from 'react'
import { Stage, Layer, Rect, Line, Circle, Group } from 'react-konva'

function WorkspaceCanvas () {
  const [width, setWidth] = useState(Number || undefined)
  const [height, setHeight] = useState(Number || undefined)
  const [defaultRect, setDefaultRect] = useState(false)
  const [rectClone, setRectCloned] = useState(true)
  const [rects, setRects] = useState(0)

  const [grpRectXY, setGrpRectXY] = useState({
    x: 100,
    y: 200
  })

  const [c1, setC1] = useState({
    x: grpRectXY.x + 40,
    y: grpRectXY.y + 30
  })
  const [c2, setC2] = useState({
    x: grpRectXY.x + 40,
    y: grpRectXY.y + 30
  })

  const [dragLine, setDragLine] = useState(false)

  const dragStartHandle = () => {
    setRects(1)
    setDefaultRect(false)
    setRectCloned(true)

    console.log(rectClone, defaultRect)
  }

  const dragEndHandle = () => {
    if (rects < 3) {
      setDefaultRect(true)
    }
  }

  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
  }, [])

  const konvaLine = () => {
    const bezierCalc = {
      control1X: c1.x > c2.x ? c1.x - c2.x : c2.x - c1.x,
      control1Y: c1.y > c2.y ? c1.y - c2.y : c2.y - c1.y,
      control2X: c1.x > c2.x ? c1.x - c2.x : c2.x - c1.x,
      control2Y: c1.y > c2.y ? c1.y - c2.y : c2.y - c1.y
    }
    return (
      <Line
        // bezier
        tension={10}
        // points={[c1.x, c1.y, c1.x-c2.x, c1.y-c2.y, c2.x, c2.y]}
        // points={[50,70,20,20,30,30,70,10]}
        // points={[0,0,bezierCalc.control1X,bezierCalc.control1Y,bezierCalc.control2X,bezierCalc.control2Y,c2.x-c1.x,c2.y-c1.y]}
        points={[0, 0, c2.x - c1.x, c2.y - c1.y]}
        x={c1.x}
        y={c1.y}
        stroke={'#ffffff'}
        // draggable
      />
    )
  }
  const konvaCircle = (
    x: number,
    y: number,
    strokeColor: string,
    setXY: any
  ) => {
    return (
      <Circle
        stroke={strokeColor}
        width={20}
        height={20}
        x={x}
        y={y}
        draggable
        onDragMove={e => {
          const stage = e.target.getStage()
          setXY({
            x: stage?.getPointerPosition()?.x,
            y: stage?.getPointerPosition()?.y
          })
          console.log(stage?.getPointerPosition())
        }}
      />
    )
  }

  const konvaRect = () => {
    const bezierCalc = {
      control1X: c1.x > c2.x ? c1.x - c2.x : c2.x - c1.x,
      control1Y: c1.y > c2.y ? c1.y - c2.y : c2.y - c1.y,
      control2X: c1.x > c2.x ? c1.x - c2.x : c2.x - c1.x,
      control2Y: c1.y > c2.y ? c1.y - c2.y : c2.y - c1.y
    }
    return (
      <>
        <Group
          draggable
          onDragMove={e => {
            setGrpRectXY({
              x: e.target.attrs.x,
              y: e.target.attrs.y
            })
            setC1({
              x: e.target.attrs.x + 40,
              y: e.target.attrs.y + 30
            })

            if (!dragLine) {
              setC2({
                x: e.target.attrs.x + 40,
                y: e.target.attrs.y + 30
              })

            }
            
          }}
          x={grpRectXY.x}
          y={grpRectXY.y}
        >
          <Rect
            id='1'
            x={0}
            y={0}
            fill='#777777'
            width={80}
            height={60}
            ondragstart={dragStartHandle}
          />
          <Circle
            stroke='#ffffff'
            width={20}
            height={20}
            x={40}
            y={30}
            draggable
            onDragStart={e => {
              e.target.stopDrag()
              return setDragLine(true)
            }}
          />
        </Group>
        <Circle
          visible={dragLine}
          stroke='#ffffff'
          width={20}
          height={20}
          x={c2.x}
          y={c2.y}
          draggable
          onDragMove={e => {
            setC2({
              x: e.target.attrs.x,
              y: e.target.attrs.y
            })
          }}
        />
        <Line
          bezier={Math.abs(c2.x - c1.x) > 150 && Math.abs(c2.y - c1.y) > 150 ? true : false}
          
          visible={dragLine}
          points={
            Math.abs(c2.x - c1.x) > 150 && Math.abs(c2.y - c1.y) > 150
              ? [
                  0,
                  0,
                  c2.x - 0.8 * c2.x,
                  0,
                  c2.x - 1 * c2.x,
                  c1.x - 0.6 * c2.x,
                  c2.x - c1.x,
                  c2.y - c1.y
                ]
              : [0, 0, c2.x - c1.x, c2.y - c1.y]
          }
          x={c1.x}
          y={c1.y}
          stroke={'#ffffff'}
        />
      </>
    )
  }

  const rectEl = (draggable: boolean | undefined) => {
    return (
      <Rect
        id='1'
        x={width / 2}
        y={height / 2}
        fill='#ffffff'
        width={80}
        height={60}
        draggable={draggable}
        onClick={() => {
          console.log('test')
        }}
        ondragstart={dragStartHandle}
      />
    )
  }

  return (
    <Stage width={width} height={height}>
      <Layer>
        {/* {rectEl(defaultRect)} */}
        {/* {rectClone && rectEl(true)} */}
        {/* <Line
          bezier
          points={[73, 70, 340, 23, 450, 60, 500, 20]}
          x={width / 2}
          y={height / 2}
          stroke={'#ffffff'}
          draggable
        /> */}
        {konvaRect()}
        {/* {konvaCircle(c1.x, c1.y, '#ffffff', setC1)} */}
        {/* {konvaCircle(c2.x, c2.y, '#777777', setC2)} */}
        {/* {konvaLine()} */}
        {/* <Circle
          fill='#ffffff'
          width={20}
          height={20}
          x={width / 2}
          y={height / 2}
          draggable
          onClick={e => {
            console.log()
          }}
        /> */}
      </Layer>
    </Stage>
  )
}

export default WorkspaceCanvas
