import React, {useContext, useEffect, useRef} from 'react'
import SettingsPanel from "@/app/components/nodesData/SettingsPanel";
import SelectionComponent from "@/app/components/nodesData/SelectionComponent";
import InputComponent from "@/app/components/nodesData/InputComponent";
import {NodesSettingsStatus} from "@/app/MLResourcePool";
import NodeNotConnected from "@/app/components/nodesData/nodeNotConnected";

function LinearRegression({id}) {
    const {nodeSettingsState, nodeSettingsDispatch} =
        useContext(NodesSettingsStatus)
    const checkNodeConnected =
        nodeSettingsState[id].connectedWith !== ''
    const columns = Object.entries(nodeSettingsState.columnFilter.columns)
        .filter(([k, v]) => v)
        .map(([v, i]) => v)

    const testSize: React.MutableRefObject<any> = useRef()
    // const fitInterceptOptions = [true, false]
    const imputerOptions = ['mean', 'median', 'most_frequent', 'constant']
    const Component: React.FC = () => {
        const onClickHandle = () => {
            nodeSettingsDispatch({
                type: 'linearRegression',
                value: {
                    test_size: (testSize.current.value === '' || testSize.current.value <= 0) ?
                        0.2 : testSize.current.value,
                    settingsActive: false
                }
            })
        }

        return (
            <div className='flex flex-col justify-center items-center w-[30vw] h-[55vh] p-[1rem]'>
                <form className='flex flex-col justify-start items-start gap-[2rem]'>
                    <SelectionComponent
                        dataArr={columns}
                        description={'Select Target Column'}
                        value={nodeSettingsState[id].target_column}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: 'linearRegression', value: {target_column: e.target.value,}})
                        }}
                    />
                    {/*<SelectionComponent*/}
                    {/*    dataArr={fitInterceptOptions}*/}
                    {/*    description={'Fit Intercept'}*/}
                    {/*    selectionRef={fitIntercept}*/}
                    {/*    value={nodeSettingsState[id].fit_intercept}*/}
                    {/*    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {*/}
                    {/*        nodeSettingsDispatch({type: 'linearRegression', value: {fit_intercept: e.target.value,}})*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <SelectionComponent
                        dataArr={imputerOptions}
                        description={'Impute Method'}
                        // selectionRef={algorithmRef}
                        value={nodeSettingsState[id].imputer_strategy}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: 'linearRegression', value: {imputer_strategy: e.target.value,}})
                        }}
                    />
                    <InputComponent
                        description={'Test size, default: 20'}
                        inputRef={testSize}
                        placeholder={nodeSettingsState[id].test_size}
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
        <SettingsPanel title='Linear Regression Configuration' id={id}>
            {checkNodeConnected ?  <Component/> : <NodeNotConnected/>}
        </SettingsPanel>
    )
}

export default LinearRegression