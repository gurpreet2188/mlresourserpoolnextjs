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
    const Component: React.FC = () => {


        return (
            <div className='flex flex-col justify-center items-center w-[100%] h-[35vh] p-[1rem]'>
                <form className='flex flex-col justify-center items-center gap-[2rem] w-[100%]'>
                    <SelectionComponent
                        dataArr={columns}
                        description={'Select Target Column'}
                        value={nodeSettingsState[id].target_column}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: 'linearRegression', value: {target_column: e.target.value,}})
                        }}
                    />
                    {/* <SelectionComponent
                        dataArr={imputerOptions}
                        description={'Impute Method'}
                        // selectionRef={algorithmRef}
                        value={nodeSettingsState[id].imputer_strategy}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            nodeSettingsDispatch({type: 'linearRegression', value: {imputer_strategy: e.target.value,}})
                        }}
                    /> */}
                    <InputComponent
                        description={'Enter value for test size, default 0.2, range (0.1 to 0.9)'}
                        inputRef={testSize}
                        placeholder={nodeSettingsState[id].test_size}
                    />
                </form>
            </div>
        )
    }

    return (
        <SettingsPanel title='Linear Regression Configuration' id={id} saveBtnClickHandle={onClickHandle}>
            {checkNodeConnected ?  <Component/> : <NodeNotConnected/>}
        </SettingsPanel>
    )
}

export default LinearRegression