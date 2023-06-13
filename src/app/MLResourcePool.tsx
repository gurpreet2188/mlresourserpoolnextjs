import React, { createContext, useReducer } from 'react'
import Workspace from './components/canvas/Workspace'
import NodesData from './components/nodesData/NodesData'
import {
  NodeSettingContext,
  NodeSettingsAction,
  NodeSettingsState
} from './interface/types'
import SystemInformation from './components/SystemInformation/SystemInformation'
const initialNodeSettingsStatus = {
  csv: { settingsActive: false },
  columnFilter: {
    settingsActive: false,
    columns: { col1: true, col2: true, col3: true }
  },
  rowFilter: { settingsActive: false },
  tableView: { settingsActive: false },
  knn: { settingsActive: false },
  linearRegression: { settingsActive: false },
  decisionTree: { settingsActive: false },
  randomForest: { settingsActive: false }
}

export const NodesSettingsStatus = createContext<NodeSettingContext>({
  nodeSettingsState: initialNodeSettingsStatus,
  nodeSettingsDispatch: () => {}
})
function MLResourcePool () {
  const [nodeSettingsState, nodeSettingsDispatch] = useReducer(
    nodeSettingsReducer,
    initialNodeSettingsStatus
  )

  function nodeSettingsReducer (
    state: NodeSettingsState,
    action: NodeSettingsAction
  ) {
    switch (action.type) {
      case 'csv':
        return {
          ...state,
          csv: {
            ...state.csv,
            settingsActive: action.value
          }
        }
      case 'columnFilter':
        return {
          ...state,
          columnFilter: {
            ...state.columnFilter,
            settingsActive: action.value
          }
        }
      case 'rowFilter':
        return {
          ...state,
          rowFilter: {
            ...state.rowFilter,
            settingsActive: action.value
          }
        }
      case 'tableView':
        return {
          ...state,
          tableView: {
            ...state.tableView,
            settingsActive: action.value
          }
        }
      case 'knn':
        return {
          ...state,
          knn: {
            ...state.knn,
            settingsActive: action.value
          }
        }
      case 'linearRegression':
        return {
          ...state,
          linearRegression: {
            ...state.linearRegression,
            settingsActive: action.value
          }
        }
      case 'decisionTree':
        return {
          ...state,
          decisionTree: {
            ...state.decisionTree,
            settingsActive: action.value
          }
        }
      case 'randomForest':
        return {
          ...state,
          randomForest: {
            ...state.randomForest,
            settingsActive: action.value
          }
        }
      default:
        return state
    }
  }

  return (
    <div className='relative w-[100%] h-[100%]'>
      <NodesSettingsStatus.Provider
        value={{ nodeSettingsState, nodeSettingsDispatch }}
      >
        <Workspace />
        <NodesData />
        <SystemInformation />
      </NodesSettingsStatus.Provider>
    </div>
  )
}

export default MLResourcePool
