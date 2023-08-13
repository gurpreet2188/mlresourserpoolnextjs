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
import HelpMessage from "@/app/components/nodesData/HelpMessage";

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
    } else if (nodeSettingsState.columnFilter.helpMessage) {
        return <HelpMessage id={'columnFilter'}/>
    } else if (nodeSettingsState.rowFilter.helpMessage) {
        return <HelpMessage id={'rowFilter'}/>
    } else if (nodeSettingsState.tableView.helpMessage) {
        return <HelpMessage id={'tableView'}/>
    } else if (nodeSettingsState.knn.helpMessage) {
        return <HelpMessage id={'knn'}/>
    } else if (nodeSettingsState.randomForest.helpMessage) {
        return <HelpMessage id={'randomForest'}/>
    } else if (nodeSettingsState.decisionTree.helpMessage) {
        return <HelpMessage id={'decisionTree'}/>
    } else if (nodeSettingsState.linearRegression.helpMessage) {
        return <HelpMessage id={'linearRegression'}/>
    } else if (nodeSettingsState.scorer.helpMessage) {
        return <HelpMessage id={'scorer'}/>
    } else if (nodeSettingsState.csv.helpMessage) {
        return <HelpMessage id={'csv'}/>
    }
}

export default NodesData
