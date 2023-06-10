import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  Reducer
} from 'react'
import { Layer, Stage } from 'react-konva'
// import Node from './shapes/Node'
import { nodeConfig, nodeStyles } from '@/app/nodes/config'
import {
  NodeState,
  NodeStateAction,
  WorkspaceContextTypes
} from '@/app/interface/types'
import Sidebar from './Sidebar'
import MainArea from './WorkspaceArea/MainArea'
import { KonvaEventObject } from 'konva/lib/Node'

const commonNodes = nodeConfig.commonNodes
const initialCommonNodeState: NodeState = {
  dummy: {
    active: false,
    anchors: [],

    anchorPoint: false,
    acceptedNodes: [],
    nodeColor: '#000000',
    x: 0,
    y: 0,
    dummy1: nodeStyles.anchor,
    anchorBaseProperties: nodeStyles.anchorBase,
    anchorPointProperties: nodeStyles.anchorPoint,
    nodeRectProperties: nodeStyles.nodeRect,
    linkProperties: nodeStyles.link,
    connectedAnchorPoints: [],
    toolTip: ''
  }
}

// const getInitialCommonNodeState:NodeState = Object.keys(commonNodes).map(v => ({...getInitialCommonNodeState}))
export const WorkSpaceContext = createContext<WorkspaceContextTypes>({
  nodeState: initialCommonNodeState,
  nodeDispatch: () => {},
  setDeleteLink: ()=>{}
})
function Workspace () {
  const [workspace, setWorkspace] = useState({
    width: 0,
    height: 0
  })

  const [nodes, setNodes] = useState<NodeState>(initialCommonNodeState)
  const [nodeClone, setNodeClone] = useState({ dummy: { copies: 0 } })
  const [nodeState, nodeDispatch] = useReducer(reducer, nodes)
  const [nodesLenght, setNodesLenght] = useState<number>(
    Object.keys(nodes).length
  )


  const [deleteLink, setDeleteLink] = useState({nodeID:"", anchorID:""})
  useEffect(() => {
    if (window) {
      setWorkspace({
        width: window.innerWidth,
        height: window.innerHeight
      })
      const handleResize = () => {
        setWorkspace({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setNodes({})
    for (const key of Object.keys(commonNodes)) {
      setNodes(p => ({
        ...p,
        [key]: {
          ...commonNodes[key],
          ...Object.fromEntries(
            commonNodes[key].anchors.map(v => [
              v,
              {
                ...nodeStyles.anchor,
                x: commonNodes[key].x + nodeStyles.anchor.x,
                y: commonNodes[key].y + nodeStyles.anchor.y
              }
            ])
          ),
          anchorBaseProperties: {
            ...nodeStyles.anchor,
            x: nodeStyles.anchorBase.x,
            y: nodeStyles.anchorBase.y
          },
          anchorPointProperties: {
            ...nodeStyles.anchorPoint,
            y: nodeStyles.anchor.y
          },
          nodeRectProperties: {
            ...nodeStyles.nodeRect
          },
          linkProperties: {
            ...nodeStyles.link
          }
        }
      }))
      setNodesLenght(Object.keys(nodes).length + 1)
    }
  }, [])

  function reducer (state: NodeState, action: NodeStateAction | any): NodeState {
    switch (action.type) {
      case 'setNodes':
        return action.nodes

      case 'updateNode':
        return {
          ...state,
          [action.nodeID]: {
            ...state[action.nodeID],
            ...action.value
          }
        }
      case 'updateAnchor':
        return {
          ...state,
          [action.nodeID]: {
            ...state[action.nodeID],
            [action.anchorID]: {
              ...state[action.nodeID][action.anchorID],
              ...action.value
            }
          }
        }

      case 'updateAnchorBase':
        return {
          ...state,
          [action.nodeID]: {
            ...state[action.nodeID],
            anchorBaseProperties: {
              ...state[action.nodeID].anchorBasePropertie,
              ...action.value
            }
          }
        }

      case 'updateAnchorPoint':
        return {
          ...state,
          [action.nodeID]: {
            ...state[action.nodeID],
            anchorPointProperties: {
              ...state[action.nodeID].anchorPointProperties,
              ...action.value
            }
          }
        }

      case 'updateLinkProperties':
        return {
          ...state,
          [action.nodeID]: {
            ...state[action.nodeID],
            linkProperties: {
              ...state[action.nodeID].linkProperties,
              ...action.value
            }
          }
        }

      default:
        return state
    }
  }

  useEffect(() => {
    if (Object.keys(nodes).length === Object.keys(commonNodes).length) {
      nodeDispatch({ type: 'setNodes', nodes: nodes })
    }
  }, [nodes])

  const verifyNodes = () => {
    return Object.keys(nodeState).length === Object.keys(commonNodes).length
  }

  const deleteLinkHandle = (e:React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Delete') {
      nodeDispatch({
        type: 'updateAnchor',
        nodeID: deleteLink.nodeID,
        anchorID: deleteLink.anchorID,
        value: { anchorConnected: false }
      })
      console.log('delete')
      setDeleteLink({nodeID:"", anchorID:""})
    }
  }

  // console.log(deleteLink)
  return (
    <div onKeyDown={deleteLinkHandle} tabIndex={0}>
      <Stage width={workspace.width} height={workspace.height}>
        <Layer>
          {verifyNodes() ? (
            <>
              <WorkSpaceContext.Provider
                value={{
                  nodeState,
                  nodeDispatch,
                  setDeleteLink
                }}
              >
                <Sidebar
                  width={workspace.width}
                  height={workspace.height}
                />
                <MainArea width={workspace.width} height={workspace.height} />
                {/* {Object.keys(commonNodes).map(v => (
                  <Node key={v} id={v} />
                ))} */}
              </WorkSpaceContext.Provider>
            </>
          ) : null}
        </Layer>
      </Stage>
    </div>
  )
}

export default Workspace
