self.addEventListener('message', (e)=> {
    const {updatedPoints} = e.data
    // console.log('worker', updatedPoints)
    const calcPoints = [
      0,
      0,
      Math.abs(
        updatedPoints.x1 - updatedPoints.x2
      ) / 2,
      0,
      Math.abs(
        updatedPoints.x1 -updatedPoints.x2
      ) / 2,
      updatedPoints.y2 - updatedPoints.y1,
      updatedPoints.x2 - updatedPoints.x1,
      updatedPoints.y2 - updatedPoints.y1
    ]
    self.postMessage({calcPoints})
   })
  