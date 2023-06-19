import React, {useContext, useEffect, useRef} from 'react'
import SettingsPanel from './SettingsPanel'
import SelectionComponent from './SelectionComponent'
import InputComponent from './InputComponent'
import {NodesSettingsStatus} from '@/app/MLResourcePool'
import {Input} from "postcss";

function KNN({id}) {
    const targetColumnRef: React.MutableRefObject<any> = useRef()
    const typeRef: React.MutableRefObject<any> = useRef()
    const algorithmRef: React.MutableRefObject<any> = useRef()
    const weightRef: React.MutableRefObject<any> = useRef()
    const leafSizeRef: React.MutableRefObject<any> = useRef()
    const {nodeSettingsState, nodeSettingsDispatch} =
        useContext(NodesSettingsStatus)
    const algorithms = ['auto', 'ball_tree', 'kd_tree', 'kd_tree']
    const weights = ['uniform', 'distance']
    const types = ['knn_classify', 'knn_regress']
    const columns = Object.entries(nodeSettingsState.columnFilter.columns)
        .filter(([k, v]) => v)
        .map(([v, i]) => v)

    console.log((columns))
    const onClickHandle = () => {
        nodeSettingsDispatch({
            type: 'knn',
            value: {
                target_column: targetColumnRef.current?.value,
                type: typeRef.current?.value,
                algorithm: algorithmRef.current?.value,
                weights: weightRef.current?.value,
                leaf_size: leafSizeRef.current?.value !== '' ? leafSizeRef.current?.value : 30
            }
        })
    }


    const Component: React.FC = () => {
        useEffect(() => {
            targetColumnRef.current.value = nodeSettingsState[id].target_column
            typeRef.current.value = nodeSettingsState[id].type
            algorithmRef.current.value = nodeSettingsState[id].algorithm
            weightRef.current.value = nodeSettingsState[id].weights
            leafSizeRef.current.value = nodeSettingsState[id].leaf_size
        }, [])
        return (
            <div className='flex flex-col justify-center items-center w-[30vw] h-[55vh] p-[1rem]'>
                <form className='flex flex-col justify-start items-start gap-[2rem]'>
                    <SelectionComponent
                        dataArr={columns}
                        description={'Select Target Column'}
                        selectionRef={targetColumnRef}
                    />
                    <SelectionComponent
                        dataArr={types}
                        description={'Select Model Type'}
                        selectionRef={typeRef}
                    />
                    <SelectionComponent
                        dataArr={algorithms}
                        description={'Select Algorithm'}
                        selectionRef={algorithmRef}
                    />
                    <SelectionComponent
                        dataArr={weights}
                        description={'Select Weight Type'}
                        selectionRef={weightRef}
                    />
                    <InputComponent
                        description={'Enter Leaf Size, default: 30'}
                        placeholder={'30'}
                        inputRef={leafSizeRef}
                    />
                </form>
                <button
                    onClick={onClickHandle}
                    className='bg-slate-400 rounded-md p-[1rem] absolute bottom-[1rem] right-[1rem]'
                >
                    Save and Close
                </button>
            </div>
        )
    }

    return (
        <SettingsPanel title='KNN Configuration' id={id}>
            <Component/>
        </SettingsPanel>
    )
}

export default KNN
