import React, { useEffect, useState } from 'react'
import { Line } from 'react-konva'

function CPULoad() {
  const [cpuLoad, setCpuLoad] = useState(0);

  useEffect(() => {
    // Simulating CPU load updates
    const fetchCPUUsage = async() =>{
      const res = await fetch('/api/cpu-usage')
      const data = await res.json()
      // console.log(data)
      setCpuLoad(await data.siCPULoad)
      return 
    }

    const interval = setInterval(() => {
      fetchCPUUsage()
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // console.log(cpuLoad)
  return (
    <div className='flex flex-row justify-center items-center gap-[0.5rem]'>
      <p className='text-sm'>CPU</p>
      <div className='h-[0.6rem] w-[5rem] border border-white/50 rounded-xl'>
        <div
          style={{
            width: `${cpuLoad}%`,
            backgroundColor: cpuLoad > 60 ? "#f77f00" : cpuLoad > 90 ? "#d62828" : '#80ed99',
            opacity: cpuLoad > 60 ? 0.6 : cpuLoad > 90 ? 1 : cpuLoad < 5 ? 0.1 : cpuLoad < 3 ? 0 : 0.4
          }}
          className='h-[100%] transition duration-150 ease-in rounded-xl'
        ></div>
      </div>
     
    </div>
  )
}

export default CPULoad