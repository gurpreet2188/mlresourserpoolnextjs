'use client'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Workspace from "./components/canvas/Workspace";


export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>


    <div className="flex flex-row  w-[100%]" style={{backgroundColor: "#1e1e1e"}}>
      <Workspace />
    </div>
    </DndProvider>
  )
}
