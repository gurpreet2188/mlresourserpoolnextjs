import React, { useEffect, useState } from 'react'
import SettingsPanel from './SettingsPanel'
import { NodeSettingProps } from '@/app/interface/types'
type TableViewProps = {}

function TableView ({ id }: NodeSettingProps) {
  const [tableData, setTableData] = useState([
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' },
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    { Name: 'Tom', Age: 35, Email: 'tom@example.com' }
  ])

  const [tableHeader, setTableHeader] = useState(['Name', 'Age', 'Email'])

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let tempHeader = []
    Object.keys(tableData).map(v => tempHeader.push(v))
    setTableHeader(tableHeader)
  }, [tableData])

  const totalPages = Math.ceil(tableData.length / 10)
  const indexOfLastEntry = currentPage * 10
  const indexOfFirstEntry = indexOfLastEntry - 10
  const currentEntries = tableData.slice(indexOfFirstEntry, indexOfLastEntry)

  const Component: React.FC = () => {
    const handlePageChange = (pageNumber:number) => {
      setCurrentPage(pageNumber)
    }
    return (
      <div className='flex flex-col gap-[1rem] '>
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
            {currentEntries.map((row, index) => (
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

        <div className='flex flex-row gap-[1rem] justify-center items-center'>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              style={{ opacity: currentPage === i + 1 ? 1 : 0.5 }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <SettingsPanel title={'Table View'} id={id}>
      <Component />
    </SettingsPanel>
  )
}

export default TableView
