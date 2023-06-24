import React, {useContext, useEffect, useState} from 'react'
import SettingsPanel from './SettingsPanel'
import {
    ColumnsType,
    NodeSettingContext,
    NodeSettingProps
} from '@/app/interface/types'
import {NodesSettingsStatus} from '@/app/MLResourcePool'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import NodeNotConnected from './nodeNotConnected'
import {MLResourcePoolREST} from '@/app/helpers/rest'
import {UserIDContext} from "@/app/[userid]/page";

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

function ColumnFilter({id}: NodeSettingProps) {
    const [userID, port] = useContext(UserIDContext)
    const {nodeSettingsState, nodeSettingsDispatch} =
        useContext(NodesSettingsStatus)
    const checkNodeConnected =
        nodeSettingsState[id].connectedWith !== ''
    const [selectedColumns, setSelectedColumns] = useState(initialColumns)
    const [filtertedColumns, setFilteredColumns] = useState(initialFilterColumns)

    useEffect(() => {
        let tempObj = {}

        for (const key of Object.keys(nodeSettingsState.columnFilter.columns)) {
            if (nodeSettingsState.columnFilter.columns[key]) {
                tempObj = {...tempObj, [key]: {hide: false, selected: false}}
            } else {
                tempObj = {...tempObj, [key]: {hide: true, selected: false}}
            }
        }
        setSelectedColumns(tempObj)

        for (const key of Object.keys(nodeSettingsState.columnFilter.columns)) {
            if (!nodeSettingsState.columnFilter.columns[key]) {
                tempObj = {...tempObj, [key]: {hide: false, selected: false}}
            } else {
                tempObj = {...tempObj, [key]: {hide: true, selected: false}}
            }
        }
        setFilteredColumns(tempObj)
    }, [])

    console.log(selectedColumns, filtertedColumns)
    const handleColumnUpadte = async () => {
        console.log(selectedColumns, filtertedColumns)
        const cols = []
        const colsObj = nodeSettingsState.columnFilter.columns
        for (const key of Object.keys(selectedColumns)) {
            if (selectedColumns[key].hide === true) {
                colsObj[key] = false
                cols.push(key)
            } else {
                colsObj[key] = true
            }
        }

        nodeSettingsDispatch({
            type: id,
            value: {ignoredCols: cols, columns: colsObj, settingsActive: false}
        })
        await MLResourcePoolREST('/api/preprocess', 'POST', JSON.stringify({
            port: port,
            type: 'column',
            columns: cols
        }))
    }
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
                [v]: {...tempObj[v], selected: !tempObj[v].selected}
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
                        [v]: {...tempFilteredObj[v], hide: false, selected: false}
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
                        [v]: {...tempObj[v], hide: false, selected: false}
                    }
                    tempFilteredObj[v].hide = true
                }
            }
            setSelectedColumns(tempObj)
            setFilteredColumns(tempFilteredObj)
        }


        return !checkNodeConnected ? (
            <NodeNotConnected/>
        ) : (
            <div className='flex flex-row gap-[2rem] justify-center items-center relative lg:w-[40vw] md:w-[80vw] md:h-[60vh]  h-[70vh] overflow-auto'>
                {/* de-selected */}
                <div className='flex flex-col gap-[1rem] justify-start items-start h-[90%] w-[30%] p-[1rem]'>
                    <h2 className='mt-0 mb-auto p-[0.4rem]'>Filtered Columns</h2>
                    <div
                        className='flex flex-col justify-start items-start self-start gap-[0.5rem] h-[100%] w-[100%] p-[0.5rem] border border-white overflow-y-scroll'>
                        {Object.keys(filtertedColumns).map(v => (
                            <div
                                className='hover:cursor-default p-[0.2rem] p-[0.5rem] rounded-lg w-[100%] text-left'
                                style={{
                                    backgroundColor: !filtertedColumns[v].selected
                                        ? 'transparent'
                                        : '#a0a0a0',
                                    display: filtertedColumns[v].hide ? 'none' : 'block'
                                }}
                                key={v}
                                onClick={e => {
                                    selectionClickHandle(
                                        e,
                                        v,
                                        filtertedColumns,
                                        setFilteredColumns
                                    )
                                }}
                            >
                                {v}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-[1rem] justify-center items-center'>
                    <button>
                        <MdChevronLeft size={24} onClick={filterButtonClickHandle}/>
                    </button>
                    <button>
                        <MdChevronRight size={24} onClick={selectionButtonClickHandle}/>
                    </button>
                </div>
                {/* selected */}
                <div className='flex flex-col gap-[1rem] p-[1rem] h-[90%] w-[30%] '>
                    <h2 className='mt-0 mb-auto p-[0.4rem]'>Selected Columns</h2>
                    <div
                        className='flex flex-col justify-start items-start self-start gap-[0.5rem] h-[100%] w-[100%] p-[0.5rem] border border-white overflow-y-scroll'>
                        {Object.keys(selectedColumns).map(v => (
                            <div
                                className='hover:cursor-default p-[0.5rem] rounded-lg w-[100%]'
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
            <SettingsPanel title={'Column Filter'} id={id} saveBtnClickHandle={handleColumnUpadte}>
                <Component/>
            </SettingsPanel>
        </div>
    )
}

export default ColumnFilter
