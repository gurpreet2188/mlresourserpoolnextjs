import { NodeStyles, NodeConfig } from "../interface/types";
export const nodePorperties = {
    rect: { size: { w: 80, h: 60 } },
    anchor: { size: { w: 20, h: 20 } },
    link: { size: { unlinkedWidth: 1, linkedWidth: 3 } }
}

export const nodeStyles: NodeStyles = {
    anchor: {
        get x() { return nodeStyles.nodeRect.width },
        get y() { return nodeStyles.nodeRect.height / 2 },
        width: 20,
        height: 20,
        color: "#ffffff",
        connectedWidth: 15,
        connectedHeight: 15,
        anchorDragging: false,
        anchorConnected: false,
        anchorProximity: false,
        connectedNode: ''
    },
    anchorBase: {
        get x() { return nodeStyles.nodeRect.width },
        get y() { return nodeStyles.nodeRect.height / 2 },
        width: 20,
        height: 20,
        color: "#ffffff",
        connectedWidth: 15,
        connectedHeight: 15
    },
    anchorPoint: {
        x: 0,
        get y() { return nodeStyles.nodeRect.height / 2 },
        width: 20,
        height: 20,
        color: "#ffffff",
        connectedWidth: 15,
        connectedHeight: 15,
        connectedNode: ''
    },
    nodeRect: { width: 80, height: 60, cornerRadius: [10, 10, 10, 10] },
    link: {
        visible: false,
        width: 1,
        color: "#ffffff",
        connectedWidth: 3,
        get x() { return nodeStyles.anchorBase.x },
        get y() { return nodeStyles.anchorBase.y },
        points: [0, 0, 0, 0]
    }
}
export const nodeConfig: NodeConfig = {

    csv: {
        name: 'CSV',
        type: 'common',
        active: false,
        connected:false,
        icon: 'GrDocumentCsv',
        anchors: ["csv1", "csv2"],
        anchorPoint: false,
        acceptedNodes: ['columnFilter', 'rowFilter', 'tableView'],
        nodeColor: "#cdb4db",
        x: 100,
        y: 100,
        staticX: 100,
        staticY: 100,
       
        toolTip: ""
    },
    columnFilter: {
        name: 'Column',
        type: 'common',
        active: false,
        connected:false,
        anchors: ['columnFilter1', 'columnFilter2'],
        icon: 'GrColumns',
        anchorPoint: true,
        acceptedNodes: ['rowFilter', 'tableView','knn', 'linearRegression','decisionTree','randomForest'],
        nodeColor: "#ffc8dd",
        x: 100,
        y: 200,
        staticX: 100,
        staticY: 200,
       
        toolTip: ""
    },

    rowFilter: {
        name: 'Row',
        active: false,
        type: 'common',
        connected:false,
        anchors: ['rowFilter1', 'rowFilter2'],
        icon: 'LuRows',
        anchorPoint: true,
        acceptedNodes: ['columnFilter', 'tableView', 'knn', 'linearRegression','decisionTree','randomForest'],
        nodeColor: "#ffafcc",
        x: 100,
        y: 200,
        staticX: 100,
        staticY: 200,
       
        toolTip: ""
    },
    tableView: {
        name: 'Table',
        active: false,
        connected:false,
        type: 'common',
        anchors: [],
        icon: 'GrTable',
        anchorPoint: true,
        acceptedNodes: [],
        nodeColor: "#a2d2ff",
        x: 100,
        y: 100,
        staticX: 100,
        staticY: 100,
       
        toolTip: ""
    },



    knn: {
        name: 'KNN',
        type: 'machineLearning',
        active: false,
        connected:false,
        anchors: ['knn1', 'knn2'],
        icon: 'BiScatterChart',
        anchorPoint: true,
        acceptedNodes: ['scorer'],
        nodeColor: "#a2d2ff",
        x: 100,
        y: 380,
        staticX: 100,
        staticY: 380,
       
        toolTip: ""
    },
    linearRegression: {
        name: 'Linear Regression',
        type: 'machineLearning',
        active: false,
        connected:false,
        anchors: ['linearRegression1', 'linearRegression2'],
        icon: 'MdAutoGraph',
        anchorPoint: true,
        acceptedNodes: ['scorer'],
        nodeColor: "#a2d2ff",
        x: 100,
        y: 380,
        staticX: 100,
        staticY: 380,
       
        toolTip: ""
    },
    decisionTree: {
        name: 'Decision Tree',
        type: 'machineLearning',
        active: false,
        connected:false,
        anchors: ['decisionTree', 'decisionTree'],
        icon: 'GrTreeOption',
        anchorPoint: true,
        acceptedNodes: ['scorer'],
        nodeColor: "#a2d2ff",
        x: 100,
        y: 480,
        staticX: 100,
        staticY: 480,
       
        toolTip: ""
    },
    randomForest: {
        name: 'Random Forest',
        type: 'machineLearning',
        active: false,
        connected:false,
        anchors: ['randomForest1', 'randomForest2'],
        icon: 'MdOutlineForest',
        anchorPoint: true,
        acceptedNodes: ['scorer'],
        nodeColor: "#a2d2ff",
        x: 100,
        y: 480,
        staticX: 100,
        staticY: 480,
       
        toolTip: ""
    },
    scorer: {
        name: 'Accuracy Score',
        type: 'machineLearning',
        active: false,
        connected:false,
        anchors: [],
        icon: 'MdSportsScore',
        anchorPoint: true,
        acceptedNodes: [],
        nodeColor: "#a2d2ff",
        x: 100,
        y: 580,
        staticX: 100,
        staticY: 580,

        toolTip: ""
    },

}

