import { NodeState } from '../interface/types'

const calcProximity = (x1: number, y1: number, x2: number, y2: number) => {
  console.log(Math.abs(0.1 * x1 - 0.1 * x2), Math.abs(0.1 * y1 - 0.1 * y2))
  if (Math.abs(0.1 * x1 - 0.1 * x2) < 2 && Math.abs(0.1 * y1 - 0.1 * y2) < 2) {
    return true
  } else {
    return false
  }
}

function calculateProximity (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  nodeArray: Array<string> = [],
  nodeState: NodeState = {}
) {
  if (nodeArray.length !== 0) {
    // for (const ids of nodeArray) {
    //     if (nodeState[ids].anchorPoint) {
    //       if (calcProximity(x, y)) {
    //         return { id: ids, found: true }
    //       }
    //     }
    //   }
  } else {
    return calcProximity(x1, y1, x2, y2)
  }
  return false
}

export default calculateProximity
