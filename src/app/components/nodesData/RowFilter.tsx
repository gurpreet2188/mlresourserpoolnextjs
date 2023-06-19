import React, { useContext, useEffect, useRef, useState } from 'react'
import SettingsPanel from './SettingsPanel'
import { NodesSettingsStatus } from '@/app/MLResourcePool'
import { MLResourcePoolREST } from '@/app/helpers/rest'

function RowFilter ({ id }) {
  const inputRef = useRef('')
  const dropCheckBoxRef = useRef()
  const columnSelected = useRef()
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext(NodesSettingsStatus)
  const [filteredrows, setFilteredRows] = useState('')
  const columns = Object.entries(nodeSettingsState.columnFilter.columns)
    .filter(([k, v]) => v === true)
    .map(([v, i]) => v)

  useEffect(() => {
    columnSelected.current.value = nodeSettingsState[id].rowColumn
    dropCheckBoxRef.current.checked = nodeSettingsState[id].dropNA
    inputRef.current.value = nodeSettingsState[id]['rows'].join(',')
  }, [])
  const Component: React.FC = () => {
    const onClickHandle = async () => {
      let tempValue = inputRef.current.value.replace(/\s+/g, '')
      // setFilteredRows(tempValue)
      tempValue = tempValue.split(',')
      console.log(tempValue)
      console.log(dropCheckBoxRef.current.checked)
      console.log(columnSelected.current.value)
      nodeSettingsDispatch({
        type: 'rowFilter',
        value: {
          rows: tempValue[0] !== '' ? tempValue : [],
          rowColumn: columnSelected.current.value,
          dropNA: dropCheckBoxRef.current.checked
        }
      })

      nodeSettingsDispatch({
        type: 'rowFilter',
        value: { settingsActive: false }
      })
      await MLResourcePoolREST(
        '/api/preprocess',
        'POST',
        JSON.stringify({
          type: 'row',
          drop: dropCheckBoxRef.current.checked,
          replace: false,
          rowFilter: tempValue[0] !== '' ? tempValue : [],
          rowFilterColumn: columnSelected.current.value
        })
      )
    }

    return (
      <div className='flex felx-row justify-center items-center w-[40vw] h-[45vh] relative'>
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
        <button
          onClick={onClickHandle}
          className='bg-slate-400 rounded-md p-[1rem] absolute bottom-[0.5rem] right-[0.5rem]'
        >
          Save and Close
        </button>
      </div>
    )
  }

  return (
    <SettingsPanel id={id} title='Row Filter'>
      <Component />
    </SettingsPanel>
  )
}

export default RowFilter
