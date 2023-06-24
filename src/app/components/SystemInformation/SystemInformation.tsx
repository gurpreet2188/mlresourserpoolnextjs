import React from 'react'
import CPULoad from './CPULoad'
import MemUsage from './MemUsage'

function SystemInformation() {
  return (
    <div className='flex flex-row gap-[2rem] absolute bottom-0 right-[4rem] p-[1rem] text-white z-10' >
        <MemUsage/>
        <CPULoad/>
    </div>
  )
}

export default SystemInformation