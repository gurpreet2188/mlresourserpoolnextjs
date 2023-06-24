import { ReactNode } from "react"

export interface WidgetProps {
    name: string,
    id: string,
    bgColor: string
}

export interface CanvasNodePorps {
    rectColor: string,
    pointID: string,
    anchorPoints: boolean,
    anchorColor: string,
    connectConfig: {
        anchorProximity: boolean,
        anchorPointXY: { x: number, y: number }, connectingAnchor: string, connectingAncorPoint: string
    },
    selectShape: React.Dispatch<React.SetStateAction<{ id: string, selected: boolean }>>,
    deleteShape: { id: string, delete: boolean },
    nodeColor: string,
}

export interface GeneralObject {
    [key: string]: { [key: string]: number }
}

export interface NodeContext {
    anchor: object,
    setAnchor: React.Dispatch<React.SetStateAction<GeneralObject>>,
    anchorPoint: object,
    setAnchorPoint: React.Dispatch<React.SetStateAction<GeneralObject>>
}

export const iNodeContext = {
    anchor: Object,
    setAnchor: () => { },
    anchorPoint: Object,
    setAnchorPoint: () => { }
    // context: Object,
    // setContext: () =>{}
}

export interface AnchorBaseConfig {

    get x(): number,
    get y(): number,
    'width': number,
    'height': number,
    'color': string,
    'connectedWidth': number,
    'connectedHeight': number,
    'connectedNode'?: string

}



export interface AnchorConfig extends AnchorBaseConfig {
    'anchorDragging': boolean,
    'anchorConnected': boolean,
    'anchorProximity': boolean,
   
    // [key:string]: 
}

export interface NodeRect {
    'width': number,
    'height': number,
    'cornerRadius': Array<number>,

}

export interface Link {
    'width': number,
    'color': string,
    'connectedWidth': number,
    'x': number,
    'y': number,
    'visible': boolean,
    'points' : Array<number>
}

export interface NodesConfigObjectChild {
    'name': string,
    'type': string,
    'active': boolean,
    'connected':boolean,
    'icon': string,
    'anchors': Array<string>,
    'anchorPoint': boolean,
    'acceptedNodes': Array<string>,
    'nodeColor': string,
    'x': number,
    'y': number,
    'staticX': number,
    'staticY': number,
    sideBarX: number,
    sideBarY: number,
    'toolTip': string,

}

export interface NodesConfigObject {
    [key: string]: NodesConfigObjectChild
}

export interface NodeStyles {
    anchor: AnchorConfig,
    anchorBase: AnchorBaseConfig,
    anchorPoint: AnchorBaseConfig,
    nodeRect: NodeRect,
    link: Link
}

export interface NodeConfig {
    [key: string]: NodesConfigObjectChild,
}


export interface NodeStateChild {
    anchorBaseProperties: AnchorBaseConfig,
    anchorPointProperties: AnchorBaseConfig,
    nodeRectProperties: NodeRect,
    linkProperties: Link
    [key: string]: any | AnchorConfig,

}

export interface NodeState {
    [key: string]: NodeStateChild
}

export interface WorkspaceContextActoi {
    type: 'getNodes' | 'updateNode' | 'updateAnchor' | 'updateAnchorBase' | 'updateAnchorPoint'

}

export type NodeStateAction = { type: 'getNodes'; nodes: NodeState }
    | { type: 'setNodes';  nodes: object }
    | { type: 'updateNode'; nodeID: string, value: object }
    | { type: 'updateAnchor'; nodeID: string, anchorID: string, value: object }
    | { type: 'updateAnchorBase'; nodeID: string, value: object }
    | { type: 'updateAnchorPoint'; nodeID: string, value: object }
    | { type: 'updateLinkProperties'; nodeID: string, value: object }
    | { type: 'updateNodeRectProperties'; nodeID: string, value: object }


// export interface NodeStateAction extends WorkspaceContextActoin {
//     nodes: NodeState,
//     nodeID: string,
//     anchorID: string,
//     value: object,
// }

export interface WorkspaceContextTypes {
    nodeState: NodeState,
    nodeDispatch: React.Dispatch<NodeStateAction>,
    setDeleteLink: React.Dispatch<{nodeID:string, anchorID:string, connectedWith: string}>
    workspaceArea: {hit:boolean, x:number,y:number}
    setWorkspaceArea: React.Dispatch<{hit:boolean, x:number,y:number}>
}


export interface NodeProps {
    id: string,
    nodeState: NodeState
}

export interface NodeStateProps {
    nodeState: NodeState,
    nodeDispatch: React.Dispatch<NodeStateAction>
}

export interface AnchorPorps extends NodeProps, NodeStateProps {
    anchorID: string,
    nodeDragging:boolean
}

export interface LinkPorps extends NodeProps {
    nodeState: NodeState,
    anchorID: string,
    setDeleteLink: React.Dispatch<{nodeID:string, anchorID:string}>,
}

export interface NodeStateReducer {

}

export interface ColumnsType {
    [key:string]: boolean
}

export interface NodeSettingsState {
    csv: {
      settingsActive: boolean;
    };
    columnFilter: {
      settingsActive: boolean,
      connectedWith: string,
      columns: ColumnsType
    };
    rowFilter: {
      settingsActive: boolean,
      connectedWith: string,
      rows: Array<string>
    };
    tableView: {
      settingsActive: boolean,
      connectedWith: string,
    };
    knn: {
      settingsActive: boolean,
      connectedWith: string,
    };
    linearRegression: {
      settingsActive: boolean,
      connectedWith: string,
    };
    decisionTree: {
      settingsActive: boolean,
      connectedWith: string,
    };
    randomForest: {
      settingsActive: boolean,
      connectedWith: string,
    };
    scorer: {
        settingsActive: boolean,
        connectedWith: string,
    };
  }

export type NodeSettingsAction =
| { type: 'all'; value: object }
| { type: 'csv'; value: object }
| { type: 'columnFilter'; value: object }
| { type: 'rowFilter'; value: object }
| { type: 'tableView'; value: object }
| { type: 'knn'; value: object }
| { type: 'linearRegression'; value: object }
| { type: 'decisionTree'; value: object }
| { type: 'randomForest'; value: object }
    | { type: 'scorer'; value: object }

export interface NodeSettingContext {
    nodeSettingsState: NodeSettingsState,
    nodeSettingsDispatch: React.Dispatch<NodeSettingsAction>
}

export interface NodeSettingProps {
    id?: string,
    title?: string
    children?: ReactNode
}
  