import { CanvasNodePorps, NodeContext } from '@/app/interface/types'
import React, { useState, useContext, useEffect } from 'react'
import { Circle, Group, Line, Rect } from 'react-konva'
import { AnchorContext, ConnectedAnchorXYConfig } from './WorkspaceOld'

export function MLNode ({
  rectColor,
  pointID,
  anchorPoints,
  anchorColor,
  connectConfig,
  selectShape,
  deleteShape,
  nodeColor,
}: CanvasNodePorps) {
  const { setAnchor, setAnchorPoint, anchor, anchorPoint } =
    useContext<NodeContext>(AnchorContext)
  // const connected = useContext<object>(ConnectContext)
  const [anchorConnected, setAnchorConnected] = useState<boolean>()
  const [dragLine, setDragLine] = useState(false)
  // const {connectedAnchorXY, setConnectedAnchorXY} = connectedAnchor
  const { connectedAnchorXY, setConnectedAnchorXY } = useContext(
    ConnectedAnchorXYConfig
  )
  // const [anchorPointReset, setAnchorPointReset] = useState(false)
  const anchorOffest = {
    x: 80,
    y: 30
  }

  const cicrleSize = 10
  const [grpRectXY, setGrpRectXY] = useState({
    x: 100,
    y: 200
  })

  const [c1, setC1] = useState({
    x: grpRectXY.x + anchorOffest.x,
    y: grpRectXY.y + anchorOffest.y
  })
  const [c2, setC2] = useState({
    x: grpRectXY.x + anchorOffest.x,
    y: grpRectXY.y + anchorOffest.y
  })

  const [shapeSelector, setshapeSelector] = useState({
    id: '',
    selected: false
  })

  const bezierCalc = {
    control1X: c1.x > c2.x ? c1.x - c2.x : c2.x - c1.x,
    control1Y: c1.y > c2.y ? c1.y - c2.y : c2.y - c1.y,
    control2X: c1.x > c2.x ? c1.x - c2.x : c2.x - c1.x,
    control2Y: c1.y > c2.y ? c1.y - c2.y : c2.y - c1.y
  }

  useEffect(() => {
    if (anchorPoints) {
      const apXY = {
        [pointID]: { x: 0, y: anchorOffest.y }
      }
      if (Object.keys(anchorPoint).length === 0) {
        setAnchorPoint({ ...apXY })
      } else {
        setAnchorPoint({ ...anchorPoint, ...apXY })
      }
    }
  }, [anchorPoints, pointID])
  // console.log(connectedAnchorXY,connectConfig)
  useEffect(() => {
    if (
      anchorConnected &&
      connectConfig.connectingAnchor === pointID &&
      connectedAnchorXY.x && connectedAnchorXY.y
    ) {
      setC2({
        x: connectedAnchorXY.x,
        y: connectedAnchorXY.y
      })
      setAnchor({
        x: connectedAnchorXY.x,
        y: connectedAnchorXY.y
      })
    }
  }, [
    connectedAnchorXY.x, connectedAnchorXY.y,
    connectConfig.anchorProximity,
    connectConfig.connectingAnchor,
    pointID, anchorConnected
  ])

  useEffect(() => {
    if(shapeSelector.selected) {
      selectShape({ id: shapeSelector.id, selected: shapeSelector.selected })
      // console.log(shapeSelector)
    }
  }, [shapeSelector.selected, shapeSelector.id])

  useEffect(() => {
    if (deleteShape.id) {
      const shapeidRegex = /[anchorLine]/g
      if (deleteShape.delete && deleteShape.id.match(shapeidRegex)) {
        setAnchorConnected(false)
        // console.log('matched')
        setC2({
          x: c1.x,
          y: c1.y
        })
        setshapeSelector({id:"", selected:false})
        const apXY = {
          [pointID]: { x: c1.x, y: c1.y }
        }
        if (Object.keys(anchor).length === 0) {
          setAnchor({ ...apXY })
        } else {
          setAnchor({ ...anchor, ...apXY })
        }
      }
    }
    // console.log("delete config", deleteShape)
  }, [deleteShape.delete, deleteShape.id])
  // console.log(anchorConnected)

  useEffect(()=> {
    if(c1.x > c2.x) {

    }


  },[c1.x,c1.y, c2.x, c2.y])
  return (
    <>
      <Group
        draggable
        id={pointID}
        onDragMove={e => {
          // console.log(connectConfig)
          setGrpRectXY({
            x: e.target.attrs.x,
            y: e.target.attrs.y
          })
          setC1({
            x: e.target.attrs.x + anchorOffest.x,
            y: e.target.attrs.y + anchorOffest.y
          })

          if (!anchorConnected) {
            setC2({
              x: e.target.attrs.x + anchorOffest.x,
              y: e.target.attrs.y + anchorOffest.y
            })
          }

          const apXY = {
            [pointID]: {
              x: e.target.attrs.x,
              y: e.target.attrs.y + anchorOffest.y
            }
          }
          if (Object.keys(anchorPoint).length === 0) {
            setAnchorPoint({ ...apXY })
          } else {
            setAnchorPoint({ ...anchorPoint, ...apXY })
          }

          if (
            connectConfig.connectingAncorPoint === pointID && connectConfig.anchorProximity
          ) {
            // console.log(connectConfig.connectingAncorPoint)
            setConnectedAnchorXY({
              x: e.target.attrs.x,
              y: e.target.attrs.y + anchorOffest.y
            })
          }
        }}
        x={grpRectXY.x}
        y={grpRectXY.y}
      >
        <Rect
          id={'node_' + pointID}
          x={0}
          y={0}
          fill={nodeColor}
          width={80}
          height={60}
          cornerRadius={[10,10,10,10]}
          // ondragstart={dragStartHandle}
        />
        <Circle
          id={'anchorBase_' + pointID}
          fill={anchorConnected ? nodeColor : '#ffffff'}
          stroke={'#ffffff'}
          strokeEnabled={anchorConnected}
          strokeWidth={2}
          width={cicrleSize}
          height={cicrleSize}
          x={anchorOffest.x}
          y={anchorOffest.y}
          onClick={() => {
            // const apXY = {
            //   [pointID]: { x: e.target.attrs.x, y: e.target.attrs.y }
            // }
            // if (Object.keys(anchorPoint).length === 0) {
            //   setAnchorPoint({ ...apXY })
            // } else {
            //   setAnchorPoint({ ...anchorPoint, ...apXY })
            // }

            return setDragLine(true)
          }}
        />
        {anchorPoints && (
          <Circle
            id={'anchorPoint' + pointID}
            fill={anchorConnected ?'#2a9d8f':  anchorColor}
            width={cicrleSize + 2}
            height={cicrleSize + 2}
            x={0}
            y={anchorOffest.y}
          />
        )}
      </Group>
      <Line
        id={'anchorLine_' + pointID}
        strokeWidth={anchorConnected ? 3: 1}
        bezier={
          Math.abs(c2.x - c1.x) > 5 && Math.abs(c2.y - c1.y) > 5
            ? true
            : false
        }
        // tension={0.4}
        // visible={dragLine}
        points={
          Math.abs(c2.x - c1.x) > 5 && Math.abs(c2.y - c1.y) > 5
            ? [
                0,
                0,
                Math.abs(c1.x - c2.x ) / 2,
                0,
                Math.abs(c1.x - c2.x ) / 2,
                c2.y - c1.y,
                c2.x - c1.x,
                c2.y - c1.y
              ]
            : [0, 0, c2.x - c1.x, c2.y - c1.y]
        }
        x={c1.x}
        y={c1.y}
        stroke={
          shapeSelector.id === 'anchorLine_' + pointID && shapeSelector.selected
            ? "#a0a0a0"
            : anchorConnected ? nodeColor : '#ffffff'
        }
        onClick={e => {
          setshapeSelector({
            id: e.target.attrs.id,
            // parentID: pointID,
            selected: !shapeSelector.selected
          })
          // console.log(lineSelect)
        }}
      />
      <Circle
        id={'anchor_' + pointID}
        // visible={dragLine}
        fill={'#ffffff'}
        width={cicrleSize}
        height={cicrleSize}
        x={c2.x}
        y={c2.y}
        draggable
        onDragMove={e => {
          setC2({
            x: e.target.attrs.x,
            y: e.target.attrs.y
          })
          const apXY = {
            [pointID]: { x: e.target.attrs.x, y: e.target.attrs.y }
          }
          if (Object.keys(anchor).length === 0 && dragLine) {
            setAnchor({ ...apXY })
          } else {
            setAnchor({ ...anchor, ...apXY })
          }
        }}
        onDragEnd={(e) => {
          
          if (!connectConfig.anchorProximity) {
            setDragLine(false)
            setC2({
              x: c1.x,
              y: c1.y
            })
            const apXY = {
              [pointID]: { x: c1.x, y: c1.y }
            }
            if (Object.keys(anchor).length === 0) {
              setAnchor({ ...apXY })
            } else {
              setAnchor({ ...anchor, ...apXY })
            }
          } else {
            if ((connectConfig.connectingAnchor = pointID)) {
              setAnchorConnected(true)
              // setDragLine(false)
              setC2({
                x: connectedAnchorXY.x,
                y: connectedAnchorXY.y
              })
            }
          }
        }}
      />
      
    </>
  )
}
