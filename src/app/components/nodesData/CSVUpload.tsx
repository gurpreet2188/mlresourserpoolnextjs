import React, { useContext, useRef, useState } from 'react'
import SettingsPanel from './SettingsPanel'
import { NodeSettingContext, NodeSettingProps } from '@/app/interface/types'
import MLResourcePool, { NodesSettingsStatus } from '@/app/MLResourcePool'
import Papa from 'papaparse'
import { MLResourcePoolREST } from '@/app/helpers/rest'
import { UserIDContext } from '@/app/[userid]/page'
import {Spinner} from "@/app/components/common/Spinner";

function CSVUpload ({ id }: NodeSettingProps) {
  const [userID,port] = useContext(UserIDContext)
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext<NodeSettingContext>(NodesSettingsStatus)

  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const [file, setFile] = useState<File | null>(null)
  const [columnCount, setColumnCount] = useState<number>(0)
  const [rowCount, setRowCount] = useState<number>(0)

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadMessage, setUploadMessage]= useState("")

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
      if(file['name'].split('.').pop() === 'csv'){
        reader.readAsText(file)
      } else {
        setErrorMessage(true)
      }

    }
  }
  const fileSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const res = await MLResourcePoolREST('/api/send-csv-backend', 'POST', JSON.stringify({userID:userID,port:port}))

    if(res['msg']==='done'){
      setUploadMessage("File Uploaded")
      setTimeout(()=>{
        setLoading(false)
        nodeSettingsDispatch({type:'csv', value:{'settingsActive': false}})
      },1000)
    } else {
      setLoading(false)
      setUploadMessage("Error uploading file, is backend connected?")
    }
  }

  const CSVComponent: React.FC = () => {
    return (
      <div className='flex flex-col gap-[1rem]'>
        <form className='flex flex-col gap-[1rem] '>
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

        </form>
        <p
          className='text-red-400'
          style={{ display: errorMessage ? 'block' : 'none' }}
        >
          Invalid CSV File.
        </p>
        <p
            className='text-white'
        >
          Upload Status : {uploadMessage}
        </p>
        {loading && <Spinner size={'2rem'}/>}
      </div>
    )
  }

  return (
    <div>
      <SettingsPanel title={'CSV Upload'} id={id} saveBtnClickHandle={fileSubmitHandle}>
        <CSVComponent />
      </SettingsPanel>
    </div>
  )
}

export default CSVUpload
