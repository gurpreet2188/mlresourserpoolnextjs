import React, {useContext, useRef, useState} from 'react'
import SettingsPanel from './SettingsPanel'

import {NodesSettingsStatus} from '@/app/MLResourcePool'
import {Input} from "postcss";
import {MLResourcePoolREST} from "@/app/helpers/rest";
import {UserIDContext} from "@/app/[userid]/page";

function Scorer({id}) {
    const [userID, port] = useContext(UserIDContext)
    const {nodeSettingsState, nodeSettingsDispatch} =
        useContext(NodesSettingsStatus)
    const [accuracy, setAccuracy] = useState("Loading..")
    const [res, setRes] = useState({
        "task_id": '',
        "task_result": {"cm": [], "accuracy": "calc"},
        "task_status": "PENDING"
    })
    const [mlType, setMLType] = useState('classify')
    const [pending, setPending] = useState(false)
    const checkNodeConnetion = () => {

        let allNodesConnected = false
        const mlAlogID = nodeSettingsState[id].connectedWith
        const filterIDOne = nodeSettingsState[mlAlogID].connectedWith
        let filterIDTwo = ''
        let csvID = ''
        if (nodeSettingsState[filterIDOne]?.connectedWith !== 'csv') {
            filterIDTwo = nodeSettingsState[filterIDOne]?.connectedWith
            if (nodeSettingsState[filterIDTwo]?.connectedWith === 'csv') {
                allNodesConnected = true
            }

        } else {
            if (nodeSettingsState[filterIDOne]?.connectedWith === 'csv') {
                allNodesConnected = true
            }
        }

        const regex = /\b\w*regress\w*\b/g;
        if((nodeSettingsState[mlAlogID].type).match(regex)){
            setMLType('regression')
        }else {
            setMLType('classify')
        }

        console.log('nodesCon',allNodesConnected)
        return [allNodesConnected, mlAlogID]
    }


    const onClickHandle = async () => {
        const [check, mlAlgo] = checkNodeConnetion()
        setPending(true)
        if (check) {
            const finalPreprocessObj = {
                port:port,
                type: 'combine',
                targetColumn: nodeSettingsState[mlAlgo].target,
                columns: nodeSettingsState.columnFilter.connectedWith !== '' ? nodeSettingsState.columnFilter.ignoredCols : [],
                drop: nodeSettingsState.rowFilter.dropNA,
                replace: false,
                rowFilter: nodeSettingsState.rowFilter.connectedWith !== '' ? nodeSettingsState.rowFilter.rows : [],
                rowFilterColumn: nodeSettingsState.rowFilter.rowColumn
            }

            const mlConfig = {...nodeSettingsState[mlAlgo], port:port}
            const preprocessRes = await MLResourcePoolREST('/api/preprocess',
                'POST',
                JSON.stringify(finalPreprocessObj))

            console.log(preprocessRes)
            if (preprocessRes.msg) {
                const taskRes = await MLResourcePoolREST('/api/start-training',
                    'POST',
                    JSON.stringify(mlConfig))

                if (taskRes.taskID) {

                    const taskCheckInterval = setInterval(async () => {
                        MLResourcePoolREST('/api/track-training-progress',
                            'POST',
                            JSON.stringify({taskID: taskRes.taskID, port:port})).then((response) => {
                            console.log('res',response)
                            if (response.task_status === 'SUCCESS') {
                                setRes(response)
                                clearInterval(taskCheckInterval)
                                setPending(false)
                            } else if (response.task_status === 'FAILED') {
                                clearInterval(taskCheckInterval)
                                setRes(response)
                                setPending(false)
                            } else if (response.task_status === 'NOTASK') {
                                clearInterval(taskCheckInterval)
                                let tempRes = res
                                tempRes.task_result = {"cm": [[0, 0], [0, 0]], accuracy: "FAILED"}
                                setRes(tempRes)
                                setPending(false)
                            }
                        })
                    }, 4000)

                }

            }
        }

    }

    const Component: React.FC = () => {

        return (
            <div className='flex flex-row gap-[2rem] justify-center items-center w-[45vw] h-[55vh] p-[1rem]'>

                {pending ? <Spinner/> : <div className='flex justify-center items-center gap-[2rem] w-[100%]'>
                    {mlType === 'classify' && <ConfusionMatrix res={res}/>}
                    <div
                        className='flex flex-col justify-center items-center w-[35%] h-[45%] p-[1rem] border border-white/50'>
                        <h2 className="text-2xl">Accuracy</h2>
                        <p className="text-xl">{
                            res.task_result.accuracy === 'FAILED' ?
                                "Something went wrong" :
                                res.task_result.accuracy === 'calc' ? " " : `${parseFloat(res.task_result.accuracy).toFixed(2)}%`}</p>
                    </div>
                </div>}
            </div>


        )
    }

    return (
        <SettingsPanel title='ML Training' id={id} saveBtnClickHandle={onClickHandle} btnText='Start training'>
            <Component/>
        </SettingsPanel>
    )
}

export default Scorer

const Spinner = () => {
    return (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div
                className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
        </div>
    )
}

const ConfusionMatrix = ({res})=>{
    return (
        <div
            className='flex flex-row gap-[2rem] justify-center items-center w-[50%] h-[70%] p-[1rem] border border-white/50'>
            <p className="mt-[2rem]">Actual</p>
            <div className="flex flex-col justify-center items-center gap-[1rem]">
                <p>Predicted</p>
                <table className='border-collapse border'>
                    <tbody>
                    {res.task_result.cm.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, columnIndex) => (
                                <td key={columnIndex} className='p-[1rem] border border-white'>{cell}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
