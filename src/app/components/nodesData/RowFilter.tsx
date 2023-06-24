import React, { useContext, useEffect, useRef, useState } from 'react'
import SettingsPanel from './SettingsPanel'
import { NodesSettingsStatus } from '@/app/MLResourcePool'
import { MLResourcePoolREST } from '@/app/helpers/rest'
import {UserIDContext} from "@/app/[userid]/page";

function RowFilter ({ id }) {
  const [userID, port] = useContext(UserIDContext)
  const inputRef = useRef('')
  const dropCheckBoxRef = useRef()
  const columnSelected = useRef()
  const { nodeSettingsState, nodeSettingsDispatch } =
      useContext(NodesSettingsStatus)
  const [columns, setColumns] = useState<Array<string>>(Object.entries(nodeSettingsState.columnFilter.columns)
      .filter(([k, v]) => v)
      .map(([v, i]) => v))

  const [filteredrows, setFilteredRows] = useState('')


  useEffect(()=>{
    if(nodeSettingsState[id].connectedWith == 'csv') {
      setColumns(Object.entries(nodeSettingsState.columnFilter.columns)
          .map(([v, i]) => v))
    } else {
      setColumns(Object.entries(nodeSettingsState.columnFilter.columns)
          .filter(([k, v]) => v)
          .map(([v, i]) => v))
    }
  },[nodeSettingsState[id].connectedWith])

  useEffect(() => {
    columnSelected.current.value = nodeSettingsState[id].rowColumn
    dropCheckBoxRef.current.checked = nodeSettingsState[id].dropNA
    inputRef.current.value = nodeSettingsState[id]['rows'].join(',')
  }, [])


  const onClickHandle = async () => {
    let tempValue = inputRef.current.value.replace(/\s+/g, '')
    // setFilteredRows(tempValue)
    tempValue = tempValue.split(',')
    console.log(tempValue)
    console.log(dropCheckBoxRef.current.checked)
    console.log(columnSelected.current.value)
    nodeSettingsDispatch({
      type: id,
      value: {
        rows: tempValue[0] !== '' ? tempValue : [],
        rowColumn: columnSelected.current.value,
        dropNA: dropCheckBoxRef.current.checked,
        settingsActive: false
      }
    })

    await MLResourcePoolREST(
        '/api/preprocess',
        'POST',
        JSON.stringify({
          port:port,
          type: 'row',
          drop: dropCheckBoxRef.current.checked,
          replace: false,
          rowFilter: tempValue[0] !== '' ? tempValue : [],
          rowFilterColumn: columnSelected.current.value
        })
    )
  }

  const Component: React.FC = () => {

    return (
      <div className='flex felx-row justify-center items-center lg:w-[40vw] md:w-[60vw] h-[45vh] relative'>
        <form className='flex flex-row gap-[4rem]'>
          <div className='flex flex-col gap-[2rem] border border-white/50 p-[1rem]'>
            <label htmlFor='selectOption'>Select Column:</label>
            <select
              ref={columnSelected}
              id='selectColumn'
              className='bg-slate-600'
              // value={selectedOption}
              // onChange={handleOptionChange}
            >
              {columns.map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <label htmlFor='rowFilter'>
              Enter Row names(seprated by comma)
            </label>
            <input
              ref={inputRef}
              name='rows'
              className='bg-slate-500 p-[1rem] rounded-sm border-none '
              type='text'
            />
          </div>

          <div className='flex flex-col justify-center items-center border border-white/50 p-[1rem]'>
            <p className='self-start mt-0 mb-auto'>Misc. Options</p>
            <div className='flex flex-row gap-[1rem]'>
              <p>Drope NA Values.</p>
              <input
                ref={dropCheckBoxRef}
                type='checkbox'
                className='form-checkbox h-5 w-5 text-indigo-600 rounded-md'

                // checked={isChecked}
                // onChange={handleCheckboxChange}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <SettingsPanel id={id} title='Row Filter' saveBtnClickHandle={onClickHandle}>
      <Component />
    </SettingsPanel>
  )
}

export default RowFilter
