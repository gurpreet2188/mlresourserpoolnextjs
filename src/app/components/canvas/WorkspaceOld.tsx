'use client'
import React, { useEffect, useState, createContext } from 'react'
import { MLNode } from './MLNode'
import { Layer, Stage } from 'react-konva'
import {
  GeneralObject,
  NodeContext,
  iNodeContext,
  NodesConfig
} from '@/app/interface/types'
import Sidebar from './Sidebar'

export const AnchorContext = createContext<NodeContext>(iNodeContext)
export const ConnectContext = createContext<object>({})
export const ConnectedAnchorXYConfig = createContext({})

function Workspace () {
  const [width, setWidth] = useState(Number || undefined)
  const [height, setHeight] = useState(Number || undefined)
  const [connectConfig, setConnectConfig] = useState<object>()
  const [connectedAnchorXY, setConnectedAnchorXY] = useState({x:0, y:0})
  const [selectedShape, setSelectedShape] = useState({id: "", selected: false })
  const [deleteShape, setDeleteShape] = useState({id: selectedShape.id, delete: true})
  const [shapes,setShapes] = useState([])
  const nodesConfig = {
    csv: {
      active: false,
      anchorDraggin: false,
      anchorPoint: false,
      acceptedNodes: [],
      nodeColor: "#cdb4db"
    },
    columnFilter: {
      active: false,
      anchorDraggin: false,
      anchorPoint: true,
      acceptedNodes: ['csv'],
      nodeColor: "#ffc8dd"
    }
  }

  // const collisionDetect = (n1:string,n2:string) =>{
  //     if (n1)
  // }
  const [anchor, setAnchor] = useState<GeneralObject>({})
  const [anchorPoint, setAnchorPoint] = useState<GeneralObject>({})
  const [anchorColor, setAnchorColor] = useState<string>('#ffffff')
  // const [nodes, setNodes] = useState<Array<object>>([])

  // const [nodes,setNodes] = useState([0,1])

  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    // setNodes([
    //   { x: 0, y: 0 },
    //   { x: 0, y: 0 }
    // ])
  }, [])

  // useEffect(()=>{
  //     if(nodes.length > 0) {
  //         for(let i=0;i < nodes.length; i++) {
  //             const key = `n${i}`
  //             setAnchorPoint({key: {x:0,y:0}})
  //         }

  //     }
  // },[nodes])

  useEffect(() => {
    if (Object.keys(anchor).length > 0 && 0 < Object.keys(anchorPoint).length) {
      // if ('n1' )

      // if () {

      // }
      let keys: Array<string> = []
      Object.keys(nodesConfig).forEach(v => {
        keys.push(v)
      })

      keys.map(v => {
        Object.keys(nodesConfig).forEach(ov => {
          if (nodesConfig[ov].acceptedNodes.includes(v)) {
            // console.log(
            //   anchor[v]?.x,
            //   anchorPoint[v]?.x,
            //   Math.abs(0.1 * anchor[v]?.x - 0.1 * anchorPoint[ov]?.x),
            //   Math.abs(0.1 * anchor[v]?.y - 0.1 * anchorPoint[ov]?.y)
            // )

            if (
              Math.abs(0.1 * anchor[v]?.x - 0.1 * anchorPoint[ov]?.x) < 2 &&
              Math.abs(0.1 * anchor[v]?.y - 0.1 * anchorPoint[ov]?.y) < 2
            ) {
              setAnchorColor('#2a9d8f')
              const newConnectionConfig = {
                anchorProximity: true,
                anchorPointXY: { x: anchorPoint[ov]?.x, y: anchorPoint[ov]?.y },
                connectingAnchor: v,
                connectingAncorPoint: ov
              }
              setConnectConfig(newConnectionConfig)
              setConnectedAnchorXY({
                x: anchorPoint[ov]?.x,
                y: anchorPoint[ov]?.y
              })
            } else {
              setAnchorColor('#ffffff')
            }
            // compatiableNode.push(ov, v)
            // console.log(v)
          }
        })
      })
      // let keys = []
      // Object.keys(nodesConfig).forEach((v, i) => {
      //   // if (nodesConfig[v].anchorPoint) {
      //     console.log(
      //       anchor[v]?.x, anchorPoint[v]?.x,
      //       Math.abs((0.1 * anchor[v]?.x) - (0.1 * anchorPoint[v]?.x)),
      //       Math.abs((0.1 * anchor[v]?.y) - (0.1 * anchorPoint[v]?.y))
      //     )
      //   // }
      //   // if (nodesConfig[v].acceptedNodes.includes(v)) {console.log(v)}

      //   if (
      //     Math.abs((0.1 * anchor[v]?.x) - (0.1 * anchorPoint[v]?.x)) < 2 &&
      //     Math.abs((0.1 * anchor[v]?.y) - (0.1 * anchorPoint[v]?.y)) < 2
      //   ) {
      //     setAnchorColor("#2a9d8f")
      //     // setConnected(true)
      //   } else {
      //     setAnchorColor("#ffffff")
      //   }
      // })
    }
  }, [anchor, anchorPoint])

  // console.log(anchor, anchorPoint)

  // useEffect(()=>{
  //   console.log(selectedShape)
  // },[selectedShape])


  return (
    <div onKeyDown={(e)=>{
      if(e.key === "Delete" && selectedShape.selected) {
        // console.log("delete", selectedShape)
        setDeleteShape({id: selectedShape.id, delete: true})
        setAnchorColor('#ffffff')
        const newConnectionConfig = {
          anchorProximity: false,
          anchorPointXY: { x: 0, y: 0 },
          connectingAnchor: "",
          connectingAncorPoint: ""
        }
        setConnectConfig(newConnectionConfig)
        setConnectedAnchorXY({
          x: false,
          y: false
        })
        setSelectedShape({id: "", selected: false })
        setTimeout(()=>{setDeleteShape({id: "", delete: false})},100)
      }
    }} tabIndex={0}>
      <Stage width={width} height={height} >
        <Layer>
          <AnchorContext.Provider
            value={{ setAnchor, setAnchorPoint, anchor, anchorPoint }}
          >
            <ConnectedAnchorXYConfig.Provider
              value={{ connectedAnchorXY, setConnectedAnchorXY }}
            >
              {/* <Sidebar connectedAnchorXY={connectedAnchorXY} setConnectedAnchorXY={setConnectedAnchorXY}/> */}
              {Object.keys(nodesConfig).map(v => {
                nodesConfig[v]['active'] = true
                return (
                  <MLNode
                    key={v}
                    rectColor='#a0a0a0'
                    pointID={v}
                    anchorPoints={nodesConfig[v]['anchorPoint']}
                    anchorColor={anchorColor}
                    connectConfig={connectConfig}
                    selectShape={setSelectedShape}
                    deleteShape={deleteShape}
                    nodeColor={nodesConfig[v].nodeColor}
                  />
                )
              })}
           </ConnectedAnchorXYConfig.Provider>

            {/* <MLNode rectColor='#a0f0f0' pointID='n1'/>
        <MLNode rectColor='#e0f0f0' pointID='n2'/> */}
          </AnchorContext.Provider>
          {/* <MLNode rectColor='#777777'/> */}
        </Layer>
      </Stage>
    </div>
  )
}

export default Workspace
