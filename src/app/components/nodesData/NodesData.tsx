import React, {useContext} from 'react'
import CSVUpload from './CSVUpload'
import {NodesSettingsStatus} from '@/app/MLResourcePool'
import ColumnFilter from './ColumnFIlter'
import RowFilter from './RowFilter'
import TableView from './TableView'
import KNN from './KNN'
import RandomForest from './RandomForest'
import LinearRegression from './LinearRegression'
import DecisionTree from './DecisionTree'
import Scorer from "@/app/components/nodesData/Scorer";

function NodesData() {
    const {nodeSettingsState, nodeSettingsDispatch} =
        useContext(NodesSettingsStatus)
    if (nodeSettingsState.csv.settingsActive) {
        return <CSVUpload id={'csv'}/>
    } else if (nodeSettingsState.columnFilter.settingsActive) {
        return <ColumnFilter id={'columnFilter'}/>
    } else if (nodeSettingsState.rowFilter.settingsActive) {
        return <RowFilter id={'rowFilter'}/>
    } else if (nodeSettingsState.tableView.settingsActive) {
        return <TableView id={'tableView'}/>
    } else if (nodeSettingsState.knn.settingsActive) {
        return <KNN id={'knn'}/>
    } else if (nodeSettingsState.randomForest.settingsActive) {
        return <RandomForest id={'randomForest'}/>
    } else if (nodeSettingsState.decisionTree.settingsActive) {
        return <DecisionTree id={'decisionTree'}/>
    } else if (nodeSettingsState.linearRegression.settingsActive) {
        return <LinearRegression id={'linearRegression'}/>
    } else if (nodeSettingsState.scorer.settingsActive) {
        return <Scorer id={'scorer'}/>
    }
}

export default NodesData
