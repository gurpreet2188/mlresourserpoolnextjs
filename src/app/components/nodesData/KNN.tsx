import React, {useContext, useEffect, useRef} from 'react'
import SettingsPanel from './SettingsPanel'
import SelectionComponent from './SelectionComponent'
import InputComponent from './InputComponent'
import {NodesSettingsStatus} from '@/app/MLResourcePool'


function KNN({id}) {
    const targetColumnRef: React.MutableRefObject<any> = useRef()
    const typeRef: React.MutableRefObject<any> = useRef()
    // const algorithmRef: React.MutableRefObject<any> = useRef()
    // const weightRef: React.MutableRefObject<any> = useRef()
    // const leafSizeRef: React.MutableRefObject<any> = useRef()
    const testSize: React.MutableRefObject<any> = useRef()
    const nNeighbors: React.MutableRefObject<any> = useRef()
    const {nodeSettingsState, nodeSettingsDispatch} =
        useContext(NodesSettingsStatus)
    // const algorithms = ['auto', 'ball_tree', 'kd_tree', 'kd_tree']
    // const weights = ['uniform', 'distance']
    const types = ['knn_classify', 'knn_regress']
    const columns = Object.entries(nodeSettingsState.columnFilter.columns)
        .filter(([k, v]) => v)
        .map(([v, i]) => v)

    const onClickHandle = () => {
        nodeSettingsDispatch({
            type: 'knn',
            value: {
                target_column: targetColumnRef.current?.value,
                type: typeRef.current?.value,
                // algorithm: algorithmRef.current?.value,
                // weights: weightRef.current?.value,
                // leaf_size: leafSizeRef.current?.value !== '' ? leafSizeRef.current?.value : 30,
                n_neighbors: nNeighbors.current?.value !== '' ? nNeighbors.current?.value : 5,
                test_size: testSize.current?.value !== '' ? testSize.current?.value : testSize.current?.value <0 || testSize.current?.value > 0 ? 0.2 : 0.2
            }
        })

        nodeSettingsDispatch({type: id, value: {settingsActive: false}})
    }


    const Component: React.FC = () => {
        useEffect(() => {
            targetColumnRef.current.value = nodeSettingsState[id].target_column
            typeRef.current.value = nodeSettingsState[id].type
            // algorithmRef.current.value = nodeSettingsState[id].algorithm
            // weightRef.current.value = nodeSettingsState[id].weights
            // leafSizeRef.current.value = nodeSettingsState[id].leaf_size
            nNeighbors.current.value = nodeSettingsState[id].n_neighbors
        }, [])
        return (
            <div className='flex flex-col justify-center items-center md:w-[60vw] lg:w-[50vw]  h-[55vh] p-[1rem]'>
                <form className='flex flex-col justify-start items-start gap-[2rem] w-[100%]'>
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
                    {/* <SelectionComponent
                        dataArr={algorithms}
                        description={'Select Algorithm'}
                        selectionRef={algorithmRef}
                    />
                    <SelectionComponent
                        dataArr={weights}
                        description={'Select Weight Type'}
                        selectionRef={weightRef}
                    /> */}
                    <InputComponent
                        description={'Enter K (Neighbours) value, default: 5'}
                        placeholder={nodeSettingsState[id].n_neighbors}
                        inputRef={nNeighbors}
                    />
                    <InputComponent
                        description={'Enter value for test size, default 0.2, range (0.1 to 0.9)'}
                        placeholder={nodeSettingsState[id].test_size}
                        inputRef={testSize}
                    />
                </form>
            </div>
        )
    }

    return (
        <SettingsPanel title='KNN Configuration' id={id} saveBtnClickHandle={onClickHandle}>
            <Component/>
        </SettingsPanel>
    )
}

export default KNN
