import React, {createContext, useEffect, useReducer} from 'react'
import Workspace from './components/canvas/Workspace'
import NodesData from './components/nodesData/NodesData'
import {
    NodeSettingContext,
    NodeSettingsAction,
    NodeSettingsState
} from './interface/types'
import SystemInformation from './components/SystemInformation/SystemInformation'

const initialNodeSettingsStatus = {
    csv: {settingsActive: false},
    columnFilter: {
        settingsActive: false,
        connectedWith: '',
        columns: {col1: true, col2: true, col3: true},
        ignoredCols: []
    },
    rowFilter: {settingsActive: false, connectedWith: '', rows: [], rowColumn: '', dropNA: false,},
    tableView: {settingsActive: false, connectedWith: ''},
    knn: {
        settingsActive: false,
        connectedWith: '',
        target_column: '',
        type: 'knn_classify',
        algorithm: 'auto',
        weights: 'uniform',
        leaf_size: 30,
        test_size:0.2
    },
    linearRegression: {
        settingsActive: false,
        connectedWith: '',
        target_column: '',
        type: 'linear_regress',
        fit_intercept: true,
        imputer_strategy: 'mean',
        test_size:0.2
    },
    decisionTree: {
        settingsActive: false, connectedWith: '',
        target_column: '',
        type: 'dt_classify',
        splitter: 'best',
        max_depth: null,
        imputer_strategy: 'mean',
        min_samples_split: 10,
        min_samples_leaf: 10,
        random_state: null,
        test_size:0.2

    },
    randomForest: {settingsActive: false, connectedWith: '',
        target_column: '',
        type: 'rf_classify',
        n_estimators: 100,
        max_depth: null,
        imputer_strategy: 'mean',
        min_samples_split:2,
        min_samples_leaf:1,
        random_state: null,
        test_size:0.2
    },
    scorer: {settingsActive: false, connectedWith: '',}
}

export const NodesSettingsStatus = createContext<NodeSettingContext>({
    nodeSettingsState: initialNodeSettingsStatus,
    nodeSettingsDispatch: () => {
    }
})

function MLResourcePool() {
    const [nodeSettingsState, nodeSettingsDispatch] = useReducer(
        nodeSettingsReducer,
        initialNodeSettingsStatus
    )

    useEffect(() => {
        const f = async () => {
            const res = await fetch('/api/docker-setup')
            const d = await res.json()
            console.log(d)
        }
    }, [])


    function nodeSettingsReducer(
        state: NodeSettingsState,
        action: NodeSettingsAction
    ) {
        switch (action.type) {
            case 'all':
                return action.value
            case 'csv':
                return {
                    ...state,
                    csv: {
                        ...state.csv,
                        ...action.value
                    }
                }
            case 'columnFilter':
                return {
                    ...state,
                    columnFilter: {
                        ...state.columnFilter,
                        ...action.value
                    }
                }
            case 'rowFilter':
                return {
                    ...state,
                    rowFilter: {
                        ...state.rowFilter,
                        ...action.value
                    }
                }
            case 'tableView':
                return {
                    ...state,
                    tableView: {
                        ...state.tableView,
                        ...action.value
                    }
                }
            case 'knn':
                return {
                    ...state,
                    knn: {
                        ...state.knn,
                        ...action.value
                    }
                }
            case 'linearRegression':
                return {
                    ...state,
                    linearRegression: {
                        ...state.linearRegression,
                        ...action.value
                    }
                }
            case 'decisionTree':
                return {
                    ...state,
                    decisionTree: {
                        ...state.decisionTree,
                        ...action.value
                    }
                }
            case 'randomForest':
                return {
                    ...state,
                    randomForest: {
                        ...state.randomForest,
                        ...action.value
                    }
                }
            case 'scorer':
                return {
                    ...state,
                    scorer: {
                        ...state.scorer,
                        ...action.value
                    }
                }
            default:
                return state
        }
    }

    console.log("setting", nodeSettingsState)
    return (
        <div className='relative w-[100%] h-[100%]'>
            <NodesSettingsStatus.Provider
                value={{nodeSettingsState, nodeSettingsDispatch}}
            >
                <Workspace/>
                <NodesData/>
                <SystemInformation/>
            </NodesSettingsStatus.Provider>
        </div>
    )
}

export default MLResourcePool
