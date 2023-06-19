import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  useContext
} from 'react'
// import {block} from 'million/react'
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
import { UserIDContext } from '@/app/[userid]/page'
import { MLResourcePoolREST } from '@/app/helpers/rest'
import { NodesSettingsStatus } from '@/app/MLResourcePool'

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
    toolTip: ''
  }
}

export const WorkSpaceContext = createContext<WorkspaceContextTypes>({
  nodeState: initialCommonNodeState,
  nodeDispatch: () => {},
  setDeleteLink: () => {},
  workspaceArea: { hit: false, x: 0, y: 0 },
  setWorkspaceArea: () => {}
})
function Workspace () {
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext(NodesSettingsStatus)
  const [workspace, setWorkspace] = useState({
    height: 0
  })
  const [userID, port]= useContext(UserIDContext)
  const [timeStamp, setTimeStamp] = useState<number>()
  const [nodes, setNodes] = useState<NodeState>(initialCommonNodeState)
  const [nodeState, nodeDispatch] = useReducer(reducer, nodes)
  // console.log(nodeState)
  const [workspaceArea, setWorkspaceArea] = useState({ hit: false, x: 0, y: 0 })
  const [deleteLink, setDeleteLink] = useState({
    nodeID: '',
    anchorID: '',
    connectedWith: ''
  })
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
    for (const key of Object.keys(nodeConfig)) {
      setNodes(p => ({
        ...p,
        [key]: {
          ...nodeConfig[key],
          ...Object.fromEntries(
            nodeConfig[key].anchors.map(v => [
              v,
              {
                ...nodeStyles.anchor,
                x: nodeConfig[key].x + nodeStyles.anchor.x,
                y: nodeConfig[key].y + nodeStyles.anchor.y
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
              ...state[action.nodeID].anchorBaseProperties,
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

      case 'updateNodeRectProperties':
        return {
          ...state,
          [action.nodeID]: {
            ...state[action.nodeID],
            nodeRectProperties: {
              ...state[action.nodeID].nodeRectProperties,
              ...action.value
            }
          }
        }

      default:
        return state
    }
  }

  useEffect(() => {
    const checkUserConfig = async () => {
      const result: object = await MLResourcePoolREST(
        '/api/load-user-config',
        'POST',
        JSON.stringify({ userID: userID })
      )
      // console.log(result)
      if (result.userConfig) {
       
        nodeDispatch({ type: 'setNodes', nodes: result.config })
        nodeSettingsDispatch({
          type: 'all',
          value: result.settings
        })
      } else {
        // if (verifyNodes()) {
        nodeDispatch({ type: 'setNodes', nodes: nodes })
        // }
      }
    }
    checkUserConfig()
  }, [nodes])

  const verifyNodes = () => {
    return Object.keys(nodeState).length === Object.keys(nodeConfig).length
  }

  const deleteLinkHandle = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Delete') {
      if (deleteLink.anchorID !== '' && deleteLink.nodeID !== '') {
        nodeDispatch({
          type: 'updateAnchor',
          nodeID: deleteLink.nodeID,
          anchorID: deleteLink.anchorID,
          value: { anchorConnected: false }
        })
        nodeSettingsDispatch({
          type: deleteLink.connectedWith,
          value: { connectedWith: '' }
        })
      }
      // console.log('setting', deleteLink)
      setDeleteLink({ nodeID: '', anchorID: '', connectedWith: '' })
    }
  }

  useEffect(() => {
    if (verifyNodes()) {
      const saveConfigInterval = setInterval(
        () =>
          MLResourcePoolREST(
            'api/save-user-config',
            'POST',
            JSON.stringify({
              userID: userID,
              config: nodeState,
              settings: nodeSettingsState
            })
          ),
        5000
      )

      return () => clearInterval(saveConfigInterval)
    }
  }, [nodeState, nodeSettingsState])

  // console.log(workspaceArea)
  return (
    <div onKeyDown={deleteLinkHandle} tabIndex={0} className='absolute'>
      <Stage width={workspace.width} height={workspace.height}>
        <Layer>
          {verifyNodes() ? (
            <>
              <WorkSpaceContext.Provider
                value={{
                  nodeState,
                  nodeDispatch,
                  setDeleteLink,
                  workspaceArea,
                  setWorkspaceArea
                }}
              >
                <Sidebar width={workspace.width} height={workspace.height} />
                {workspaceArea.hit ? (
                  <MainArea width={workspace.width} height={workspace.height} />
                ) : (
                  <></>
                )}
              </WorkSpaceContext.Provider>
            </>
          ) : null}
        </Layer>
      </Stage>
    </div>
  )
}

export default Workspace
