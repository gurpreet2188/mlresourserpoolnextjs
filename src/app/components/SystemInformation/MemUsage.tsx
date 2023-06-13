import React, { useEffect, useState } from 'react'
import { Line } from 'react-konva'

function MemUsage() {
  const [memUsage, setMemusage] = useState(0);

  useEffect(() => {
    // Simulating CPU load updates
    const fetchCPUUsage = async() =>{
      const res = await fetch('/api/ram-usage')
      const data = await res.json()
      setMemusage(await data.siMemLoad.available / data.siMemLoad.total  * 100)
      return 
    }

    const interval = setInterval(() => {
      fetchCPUUsage()
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // console.log(memUsage)
  return (
    <div className='flex flex-row justify-center items-center gap-[0.5rem]'>
      <p className='text-sm'>RAM</p>
      <div className='h-[0.6rem] w-[5rem] border border-white/50 rounded-xl'>
        <div
          style={{
            width: `${memUsage}%`,
            backgroundColor: memUsage > 60 ? "#f77f00" : memUsage > 90 ? "#d62828" : '#80ed99',
            opacity: memUsage > 60 ? 0.6 : memUsage > 90 ? 1 : memUsage < 5 ? 0.1 : memUsage < 3 ? 0 : 0.4
          }}
          className='h-[100%] transition duration-150 ease-in rounded-xl'
        ></div>
      </div>
     
    </div>
  )
}

export default MemUsage