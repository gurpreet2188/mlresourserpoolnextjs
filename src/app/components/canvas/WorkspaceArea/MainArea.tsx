import { useContext, useEffect, useRef } from 'react';
import { Rect } from 'react-konva'
import Konva from 'konva';
import { WorkspaceContextTypes } from '@/app/interface/types';
import { WorkSpaceContext } from '../Workspace';

type SidebarPorps = {
  width: number
  height: number
}

function MainArea ({ width, height }: SidebarPorps) {
  const { workspaceArea, setWorkspaceArea, nodeState, nodeDispatch } = useContext< WorkspaceContextTypes>(WorkSpaceContext)
  const rectRef = useRef(null);
  useEffect(() => {
    const rectNode = rectRef.current;

    const fadeIn = new Konva.Tween({
      node: rectNode,
      opacity: 1,
      duration: 0.5,
      onFinish: () => {
        fadeOut.play();
      },
    });

    const fadeOut = new Konva.Tween({
      node: rectNode,
      opacity: 0,
      duration: 0.5,
      onFinish: () => {
        fadeIn.reset();
        fadeOut.reset();
        fadeIn.play();
      },
    });

    fadeIn.play();

    return () => {
      fadeIn.destroy();
      fadeOut.destroy();
    };
  }, []);
  return (
    <Rect
    ref={rectRef}
      width={width - workspaceArea.x}
      height={height}
      fill='rgba(255, 255, 255, 0.1)'
      stroke='#ffffff'
      x={workspaceArea.x}
    />
  )
}

export default MainArea
