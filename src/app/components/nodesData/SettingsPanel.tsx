import { NodesSettingsStatus } from '@/app/MLResourcePool'
import { NodeSettingContext, NodeSettingProps } from '@/app/interface/types'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
// bg
// rounded corner
// title
// settings array
// save button


const SettingsPanel: React.FC<NodeSettingProps> = ({ id, title, children }) => {
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext<NodeSettingContext>(NodesSettingsStatus)
  const [windowProperties, setWindowPorperties] = useState({
    width: 0,
    height: 0
  })
  useEffect(() => {
    if (window) {
      setWindowPorperties({
        width: window.innerWidth,
        height: window.innerHeight
      })
      const handleResize = () => {
        setWindowPorperties({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const closeButtonHandle = () =>{
    nodeSettingsDispatch({type:id, value: false})
  }
  return (
    <div
      className='flex flex-col justify-center items-center bg-white/20 backdrop-blur-sm h-[100%] w-[100%] absolute '
      style={{ width: windowProperties.width, height: windowProperties.height }}
    >
      <div className='flex flex-col p-[1rem] gap-[2rem] rounded-lg bg-gray-700 text-white absolute m-auto border border-white/50'>
        <div className='flex flex-row justify-center gap-[4rem] items-center border-b-[1px] border-white p-[0.5rem]'>
          <h2 className='text-3xl text-center'>{title}</h2>
          <div className='flex-grow'></div>
          <button className='bg-transparent' onClick={closeButtonHandle}>
            <MdClose size={24} />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}

export default SettingsPanel
