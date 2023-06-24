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

    // const typeRef: React.MutableRefObject<any> = useRef()
    const randomStateRef: React.MutableRefObject<any> = useRef()
    // const imputerOptions = ['mean', 'median', 'most_frequent', 'constant']
    const types = ['dt_classify', 'dt_regress']
    // const splitter = ['best', 'random']
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
    const Component: React.FC = () => {

        return (
            <div className='flex flex-col justify-center items-center w-[100%] h-[60vh] p-[1rem]'>
                <form className='flex flex-col justify-center items-center gap-[2rem] w-[100%]'>
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
                    {/* <SelectionComponent
                        dataArr={imputerOptions}
                        disable={nodeSettingsState[id].type == 'dt_classify' && true}
                        description={'Impute Method (Regression)'}
                        // selectionRef={algorithmRef}
                        value={nodeSettingsState[id].imputer_strategy}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: id, value: {imputer_strategy: e.target.value,}})
                        }}
                    /> */}
                    {/* <SelectionComponent
                        dataArr={splitter}
                        description={'Splitting Method'}
                        // selectionRef={algorithmRef}
                        value={nodeSettingsState[id].splitter}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: id, value: {splitter: e.target.value,}})
                        }}
                    /> */}
                    <InputComponent
                        description={'Random State, default: None'}
                        inputRef={randomStateRef}
                        placeholder={nodeSettingsState[id].random_state}
                    />
                    <InputComponent
                        description={'Test size, default: 0.2'}
                        inputRef={testSize}
                        placeholder={nodeSettingsState[id].test_size}
                    />

                </form>

            </div>
        )
    }

    return (
        <SettingsPanel title='Decision Tree Configuration' id={id} saveBtnClickHandle={onClickHandle}>
            {checkNodeConnected ? <Component/> : <NodeNotConnected/>}
        </SettingsPanel>
    )
}

export default DecisionTree