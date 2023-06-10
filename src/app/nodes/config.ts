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
        anchorProximity: false
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
        connectedHeight: 15
    },
    nodeRect: { width: 80, height: 60, cornerRadius: [10, 10, 10, 10] },
    link: {
        visible: false,
        width: 1,
        color: "#ffffff",
        connectedWidth: 3,
        get x() { return nodeStyles.anchorBase.x },
        get y() { return nodeStyles.anchorBase.y },
        points: [0,0,0,0]
    }
}
export const nodeConfig: NodeConfig = {
    commonNodes: {
        csv: {
            name: 'CSV',
            active: false,
            icon: 'GrDocumentCsv',
            anchors: ["csv1", "csv2", "csv3", "csv4"],
            anchorPoint: false,
            acceptedNodes: ['columnFilter', 'rowFilter', 'tableView'],
            nodeColor: "#cdb4db",
            x: 100,
            y: 100,
            staticX: 100,
            staticY: 100,
            connectedAnchorPoints: [],
            toolTip: ""
        },
        columnFilter: {
            name: 'Column',
            active: false,
            anchors: ['columnFilter1', 'columnFilter2', 'columnFilter3'],
            icon: 'GrColumns',
            anchorPoint: true,
            acceptedNodes: ['rowFilter', 'tableView'],
            nodeColor: "#ffc8dd",
            x: 100,
            y: 100,
            staticX: 100,
            staticY: 100,
            connectedAnchorPoints: [],
            toolTip: ""
        },

        rowFilter: {
            name: 'Row',
            active: false,
            anchors: ['rowFilter1', 'rowFilter2', 'rowFilter3'],
            icon: 'LuRows',
            anchorPoint: true,
            acceptedNodes: ['columnFilter', 'tableView'],
            nodeColor: "#ffafcc",
            x: 100,
            y: 100,
            staticX: 100,
            staticY: 100,
            connectedAnchorPoints: [],
            toolTip: ""
        },
        tableView: {
            name: 'Table',
            active: false,
            anchors: [],
            icon: 'GrTable',
            anchorPoint: true,
            acceptedNodes: [],
            nodeColor: "#a2d2ff",
            x: 100,
            y: 100,
            staticX: 100,
            staticY: 100,
            connectedAnchorPoints: [],
            toolTip: ""
        }
    }

}