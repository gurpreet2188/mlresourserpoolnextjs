'use client'
import { DndProvider } from "react-dnd";
// import {Sidebar} from "./components/Sidebar";
// import Workspace from "./components/Workspace";
import { HTML5Backend } from "react-dnd-html5-backend";
import Workspace from "./components/canvas/Workspace";
// import Workspace from "./components/canvas/WorkspaceOld";
// import { MLNode } from "./components/canvas/MLNode";
// import Sidebar from "./components/canvas/Sidebar";
// import WorkspaceCanvas from "./components/WorkspaceCanvas";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>


    <div className="flex flex-row  w-[100%]" style={{backgroundColor: "#1e1e1e"}}>
      <Workspace />
      {/* <Sidebar /> */}
      {/* <MLNode /> */}
      {/* <Workspace /> */}
      {/* <WorkspaceCanvas/> */}
    {/* <Sidebar /> */}
    {/* <Workspace/> */}
    </div>
    </DndProvider>
  )
}
