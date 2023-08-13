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
    csv: {
        settingsActive: false,
        helpMessage: false,
        message: "CSV Node is only Compatible with Column and Row filter and Table View Nodes."
    },
    columnFilter: {
        settingsActive: false,
        helpMessage: false,
        connectedWith: '',
        connectedAnchorID: '',
        columns: {col1: true, col2: true, col3: true},
        ignoredCols: [],
        message: "Column Filter Node is only Compatible with Column and Row filter and Table View Nodes."
    },
    rowFilter: {
        settingsActive: false, helpMessage: false, connectedWith: '', rows: [], rowColumn: '', dropNA: false,
        message: "Row Filter Node is only Compatible with Column Filter, CSV and Table View Nodes."
    },
    tableView: {
        settingsActive: false, helpMessage: false, connectedWith: '',
        message: ""
    },
    knn: {
        settingsActive: false,
        helpMessage: false,
        connectedWith: '',
        connectedAnchorID: '',
        target_column: '',
        type: 'knn_classify',
        algorithm: 'auto',
        weights: 'uniform',
        leaf_size: 30,
        test_size: 0.2,
        n_neighbors: 5,
        message: "K-NN Node is only Compatible with Accuracy Score Node."
    },
    linearRegression: {
        settingsActive: false,
        helpMessage: false,
        connectedWith: '',
        connectedAnchorID: '',
        target_column: '',
        type: 'linear_regress',
        fit_intercept: true,
        imputer_strategy: 'mean',
        test_size: 0.2,
        message: "Linear Regression Node is only Compatible with Accuracy Score Node."
    },
    decisionTree: {
        settingsActive: false,
        helpMessage: false,
        connectedWith: '',
        connectedAnchorID: '',
        target_column: '',
        type: 'dt_classify',
        splitter: 'best',
        max_depth: null,
        imputer_strategy: 'mean',
        min_samples_split: 10,
        min_samples_leaf: 10,
        random_state: null,
        test_size: 0.2,
        message: "Decision Tree Node is only Compatible with Accuracy Score Node."

    },
    randomForest: {
        settingsActive: false,
        helpMessage: false,
        connectedWith: '',
        connectedAnchorID: '',
        target_column: '',
        type: 'rf_classify',
        n_estimators: 100,
        max_depth: null,
        imputer_strategy: 'mean',
        min_samples_split: 2,
        min_samples_leaf: 1,
        random_state: null,
        test_size: 0.2,
        message: "Random Forest Node is only Compatible with Accuracy Score Node."
    },
    scorer: {settingsActive: false, helpMessage: false, connectedWith: '', message: ""}
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
