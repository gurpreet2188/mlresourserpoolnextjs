import React, { useContext, useEffect, useRef, useState } from 'react'
import SettingsPanel from './SettingsPanel'
import { NodeSettingProps } from '@/app/interface/types'
import { MLResourcePoolREST } from '@/app/helpers/rest'
import { NodesSettingsStatus } from '@/app/MLResourcePool'
import NodeNotConnected from './nodeNotConnected'
import {UserIDContext} from "@/app/[userid]/page";

function TableView ({ id }: NodeSettingProps) {
  const [userID,port] = useContext(UserIDContext)
  const { nodeSettingsState, nodeSettingsDispatch } =
    useContext(NodesSettingsStatus)
  const checkNodeConnected =
    nodeSettingsState[id].connectedWith === '' ? false : true

  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState([
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' }
  ])
  const [tableHeader, setTableHeader] = useState(['Name', 'Age', 'Email'])
  const [currentPage, setCurrentPage] = useState(2)
  const [totalPages, setTotalPages] = useState(0)
  const [errorMsg , setErrorMsg] = useState("Loading Dataset....")

  useEffect(() => {
    setLoading(true)
    const f = async () => {
      const connectedWith = nodeSettingsState[id].connectedWith
      const res = await MLResourcePoolREST(
        '/api/csv-pages',
        'POST',
        JSON.stringify({
          port: port,
          page_number: currentPage,
          connectedWith: connectedWith
        })
      )

      if(res.msg === "failed") {
        setLoading(true)
        setErrorMsg("Backend disconnected")
      }else {
        setTableHeader(Object.keys(res.res.page_data[0]))
        setTotalPages(res.res.total_pages)
        setTableData(res.res.page_data)
        setLoading(false)
      }
    }
    if (checkNodeConnected) {
      f()
    }
  }, [currentPage, checkNodeConnected])

  const Component: React.FC = () => {
    const pageRef = useRef()
    const handlePageChange = () => {
      try {
        const pageNumber = parseInt(pageRef.current.value)
        if (pageNumber < 0 && pageNumber > totalPages + 1) {
          pageRef.current.placeholder = 'Invalid Number '
        } else {
          setCurrentPage(pageNumber)
          pageRef.current.placeholder = `Enter an page number between 1 - ${totalPages}`
        }
      } catch (err) {
        pageRef.current.placeholder = 'Invalid Number Entered'
      }
    }
    return !checkNodeConnected ? (
      <NodeNotConnected />
    ) : (
      <div className='flex flex-col gap-[1rem] w-[80vw] md:h-[60vh] lg:h-[77vh] h-[70%] overflow-scroll z-20 p-[1rem]'>
        {loading ? (
          <h1 className='text-3xl text-center self-center place-self-center justify-self-center'>
            {errorMsg}
          </h1>
        ) : (
          <>
            <table className='border-spacing-[10px]'>
              <thead>
                <tr>
                  {tableHeader.map((header: string) => (
                    <th key={header} className='p-[1rem] border border-white'>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {tableHeader.map((header: string) => (
                      <td key={header} className='p-[1rem] border border-white'>
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <form className='flex flex-row gap-[2rem] justify-center items-center'>
              <input
                ref={pageRef}
                className='bg-slate-600 p-[1rem] rounded-md w-[50%]'
                type='number'
                placeholder={`Enter an page number between 1 - ${totalPages}`}
              />
              <button
                className='bg-slate-700 p-[1rem]'
                onClick={handlePageChange}
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    )
  }

  return (
    <SettingsPanel title={'Table View'} id={id} showSaveBtn={false}>
      <Component />
    </SettingsPanel>
  )
}

export default TableView
