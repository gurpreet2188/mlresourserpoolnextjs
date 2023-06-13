import React, { useContext } from 'react'
import SettingsPanel from './SettingsPanel'
import { NodeSettingContext, NodeSettingProps } from '@/app/interface/types'
import { NodesSettingsStatus } from '@/app/MLResourcePool'

function CSVUpload ({ id }: NodeSettingProps) {
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext<NodeSettingContext>(NodesSettingsStatus)
  const CSVComponent: React.FC = () => {
    return (
      <form className='flex flex-col gap-[0.5rem] '>
        <label htmlFor='fileUpload'>Upload Dataset CSV.</label>
        <input id='fileUpload' type='file' />
      </form>
    )
  }

  return (
    <div>
      <SettingsPanel title={'CSV Upload'} id={id}>
        <CSVComponent />
      </SettingsPanel>
    </div>
  )
}

export default CSVUpload
