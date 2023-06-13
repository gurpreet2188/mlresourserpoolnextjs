import React, { useContext, useEffect, useState } from 'react'
import SettingsPanel from './SettingsPanel'
import {
  ColumnsType,
  NodeSettingContext,
  NodeSettingProps
} from '@/app/interface/types'
import { NodesSettingsStatus } from '@/app/MLResourcePool'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const initialColumns = {
  col1: {
    selected: true,
    hide: false
  }
}

const initialFilterColumns = {
  col1: {
    selected: false,
    hide: true
  }
}

function ColumnFilter ({ id }: NodeSettingProps) {
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext<NodeSettingContext>(NodesSettingsStatus)
  const [selectedColumns, setSelectedColumns] = useState(initialColumns)
  const [filtertedColumns, setFilteredColumns] = useState(initialFilterColumns)

  useEffect(() => {
    let tempObj = {}

    for (const key of Object.keys(nodeSettingsState.columnFilter.columns)) {
      tempObj = { ...tempObj, [key]: { hide: false, selected: false } }
    }
    setSelectedColumns(tempObj)

    for (const key of Object.keys(nodeSettingsState.columnFilter.columns)) {
      tempObj = { ...tempObj, [key]: { hide: true, selected: false } }
    }
    setFilteredColumns(tempObj)
  }, [nodeSettingsState.columnFilter])

  console.log(selectedColumns, filtertedColumns)

  const Component: React.FC = () => {
    const listStyles = (isSeleceted: boolean): React.CSSProperties => {
      console.log(isSeleceted)
      return {
        backgroundColor: isSeleceted ? '#a0a0a0' : 'transparent',
        color: isSeleceted ? '#1e1e1e' : '#ffffff'
      }
    }

    const selectionClickHandle = (e, v, type, setType) => {
      let tempObj = type
      tempObj = {
        ...tempObj,
        [v]: { ...tempObj[v], selected: !tempObj[v].selected }
      }
      setType(tempObj)
    }

    const filterButtonClickHandle = () => {
      let tempObj = selectedColumns
      let tempFilteredObj = filtertedColumns
      for (const v of Object.keys(tempObj)) {
        if (tempObj[v].selected) {
          tempFilteredObj = {
            ...tempFilteredObj,
            [v]: { ...tempFilteredObj[v], hide: false, selected: false }
          }
          tempObj[v].hide = true
        }
      }
      setSelectedColumns(tempObj)
      setFilteredColumns(tempFilteredObj)
    }

    const selectionButtonClickHandle = () => {
      let tempObj = selectedColumns
      let tempFilteredObj = filtertedColumns
      for (const v of Object.keys(tempFilteredObj)) {
        if (tempFilteredObj[v].selected) {
          tempObj = {
            ...tempObj,
            [v]: { ...tempObj[v], hide: false, selected: false }
          }
          tempFilteredObj[v].hide = true
        }
      }
      setSelectedColumns(tempObj)
      setFilteredColumns(tempFilteredObj)
    }
    return (
      <div className='flex flex-row gap-[2rem] justify-center items-center'>
        {/* de-selected */}
       <div className='flex flex-col gap-[1rem] justify-center items-center max-h-[10rem] overflow-y-scroll border border-white p-[1rem]'>
       <h2 className='border-b-[1px] border-white'>Filtered Columns</h2>
        <div className='flex flex-col justify-center items-center self-start gap-[0.5rem] p-[0.5rem]  '>
          {Object.keys(filtertedColumns).map(v => (
            <div
              className='hover:cursor-default p-[0.2rem]'
              style={{
                backgroundColor: !filtertedColumns[v].selected
                  ? 'transparent'
                  : '#a0a0a0',
                display: filtertedColumns[v].hide ? 'none' : 'block'
              }}
              key={v}
              onClick={e => {
                selectionClickHandle(e, v, filtertedColumns, setFilteredColumns)
              }}
            >
              {v}
            </div>
          ))}
        </div>
       </div>

        <div className='flex flex-col gap-[1rem] justify-center items-center'>
          <button>
            <MdChevronLeft size={24} onClick={filterButtonClickHandle} />
          </button>
          <button>
            <MdChevronRight size={24} onClick={selectionButtonClickHandle} />
          </button>
        </div>
        {/* selected */}
        <div className='flex flex-col gap-[1rem] p-[1rem] border border-white max-h-[10rem] overflow-y-scroll'>
          <h2 className='border-b-[1px] border-white'>Selected Columns</h2>
          <div className='flex flex-col justify-center items-center self-start gap-[0.5rem] p-[0.5rem] '>
            {Object.keys(selectedColumns).map(v => (
              <div
                className='hover:cursor-default p-[0.2rem]'
                style={{
                  backgroundColor: !selectedColumns[v].selected
                    ? 'transparent'
                    : '#a0a0a0',
                  display: selectedColumns[v]?.hide ? 'none' : 'block'
                }}
                key={v}
                onClick={e => {
                  selectionClickHandle(
                    e,
                    v,
                    selectedColumns,
                    setSelectedColumns
                  )
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SettingsPanel title={'Column Filter'} id={id}>
        <Component />
      </SettingsPanel>
    </div>
  )
}

export default ColumnFilter
