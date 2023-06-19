import React, { useContext, useRef, useState } from 'react'
import SettingsPanel from './SettingsPanel'
import { NodeSettingContext, NodeSettingProps } from '@/app/interface/types'
import MLResourcePool, { NodesSettingsStatus } from '@/app/MLResourcePool'
import Papa from 'papaparse'
import { MLResourcePoolREST } from '@/app/helpers/rest'
import { UserIDContext } from '@/app/[userid]/page'

function CSVUpload ({ id }: NodeSettingProps) {
  const userID = useContext(UserIDContext)
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext<NodeSettingContext>(NodesSettingsStatus)

  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const [file, setFile] = useState<File | null>(null)
  const [columnCount, setColumnCount] = useState<number>(0)
  const [rowCount, setRowCount] = useState<number>(0)

  const fileRef = useRef<HTMLInputElement | null>(null)



  function handleFileInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = function (e) {
        if (e.target) {
          const csvData = e.target.result
          Papa.parse(csvData, {
            complete: async function (results) {
              const { data } = results
              if (data.length > 0) {
                setColumnCount(data[0].length)
                setRowCount(data.length)
                setErrorMessage(false)
                
                const cols:{} = {}
                for (const key of data[0]) {
                  cols[key] = true
                }
                nodeSettingsDispatch({type:'columnFilter', value: {columns: cols, ignoredCols: []}})
                nodeSettingsDispatch({type:'rowFilter', value: {rows: [], rowColumn: '', dropNA: false}})
                await MLResourcePoolREST(
                  '/api/save-user-csv',
                  'POST',
                  JSON.stringify({ userID: userID, csvData: data})
                )
              } else {
                setErrorMessage(true)
              }
              const columns = data.length > 0 ? data[0] : []

              console.log(columns)
            }
          })
        }
      }

      reader.readAsText(file)
    }
  }
  const fileSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await MLResourcePoolREST('/api/send-csv-backend', 'POST', JSON.stringify({userID:userID}))
    // const csvFile = fileRef.current

    // const formData = new FormData()
    // formData.append('file', csvFile.files[0])
    // try {
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const CSVComponent: React.FC = () => {
    return (
      <div className='flex flex-col gap-[1rem]'>
        <form onSubmit={fileSubmitHandle} className='flex flex-col gap-[1rem] '>
          <label htmlFor='fileUpload' className='text-xl'>
            Upload Dataset in CSV format.
          </label>
          <input
            ref={fileRef}
            id='fileUpload'
            onChange={handleFileInputChange}
            type='file'
          />
          <p
            className='text-green-400'
            style={{ display: !errorMessage ? 'block' : 'none' }}
          >
            {columnCount > 0
              ? `CSV loaded, found ${columnCount} columns and ${rowCount} Rows`
              : ''}
          </p>
          <button
            type='submit'
            className='self-end bg-slate-600 p-[1rem] rounded-lg'
          >
            Submit
          </button>
        </form>
        <p
          className='text-red-400'
          style={{ display: errorMessage ? 'block' : 'none' }}
        >
          Invalid CSV File.
        </p>
      </div>
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
