import React, {useContext, useRef} from 'react'
import {NodesSettingsStatus} from "@/app/MLResourcePool";
import SettingsPanel from "@/app/components/nodesData/SettingsPanel";
import NodeNotConnected from "@/app/components/nodesData/nodeNotConnected";
import SelectionComponent from "@/app/components/nodesData/SelectionComponent";
import InputComponent from "@/app/components/nodesData/InputComponent";

function DecisionTree({id}) {
    const {nodeSettingsState, nodeSettingsDispatch} =
        useContext(NodesSettingsStatus)
    const checkNodeConnected =
        nodeSettingsState[id].connectedWith !== ''
    const columns = Object.entries(nodeSettingsState.columnFilter.columns)
        .filter(([k, v]) => v)
        .map(([v, i]) => v)
    const testSize: React.MutableRefObject<any> = useRef()

    const typeRef: React.MutableRefObject<any> = useRef()
    const randomStateRef: React.MutableRefObject<any> = useRef()
    const imputerOptions = ['mean', 'median', 'most_frequent', 'constant']
    const types = ['dt_classify', 'dt_regress']
    const splitter = ['best', 'random']
    const Component: React.FC = () => {
        const onClickHandle = () => {
            nodeSettingsDispatch({
                type: id,
                value: {
                    test_size: (testSize.current.value === '' || testSize.current.value <= 0) ?
                        0.2 : testSize.current.value,
                    random_state:
                        (randomStateRef.current.value === '' || randomStateRef.current.value <= 0) ?
                            null : randomStateRef.current.value,

                    settingsActive: false
                }
            })
        }
        return (
            <div className='flex flex-col justify-center items-center w-[30vw] h-[60vh] p-[1rem]'>
                <form className='flex flex-col justify-start items-start gap-[2rem]'>
                    <SelectionComponent
                        dataArr={types}
                        description={'Select Model Type'}
                        value={nodeSettingsState[id].type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: id, value: {type: e.target.value,}})
                        }}
                    />
                    <SelectionComponent
                        dataArr={columns}
                        description={'Select Target Column'}
                        value={nodeSettingsState[id].target_column}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: id, value: {target_column: e.target.value,}})
                        }}
                    />
                    <SelectionComponent
                        dataArr={imputerOptions}
                        disable={nodeSettingsState[id].type == 'dt_classify' && true}
                        description={'Impute Method (Regression)'}
                        // selectionRef={algorithmRef}
                        value={nodeSettingsState[id].imputer_strategy}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: id, value: {imputer_strategy: e.target.value,}})
                        }}
                    />
                    <SelectionComponent
                        dataArr={splitter}
                        description={'Splitting Method'}
                        // selectionRef={algorithmRef}
                        value={nodeSettingsState[id].splitter}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: id, value: {splitter: e.target.value,}})
                        }}
                    />
                    <InputComponent
                        description={'Random State, default: None'}
                        inputRef={randomStateRef}
                        placeholder={nodeSettingsState[id].random_state}
                    />
                    <InputComponent
                        description={'Test size, default: 20'}
                        inputRef={testSize}
                        placeholder={nodeSettingsState[id].random_state}
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
        <SettingsPanel title='Decision Tree Configuration' id={id}>
            {checkNodeConnected ? <Component/> : <NodeNotConnected/>}
        </SettingsPanel>
    )
}

export default DecisionTree