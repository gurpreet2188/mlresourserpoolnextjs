import React, {useContext, useRef} from 'react'
import {NodesSettingsStatus} from "@/app/MLResourcePool";
import SettingsPanel from "@/app/components/nodesData/SettingsPanel";
import NodeNotConnected from "@/app/components/nodesData/nodeNotConnected";
import SelectionComponent from "@/app/components/nodesData/SelectionComponent";
import InputComponent from "@/app/components/nodesData/InputComponent";

function RandomForest({id}) {
  const {nodeSettingsState, nodeSettingsDispatch} =
      useContext(NodesSettingsStatus)
  const checkNodeConnected =
      nodeSettingsState[id].connectedWith !== ''
  const testSize: React.MutableRefObject<any> = useRef(0.2)
  const nEstimator :React.MutableRefObject<any> = useRef(100)
  const randomStateRef: React.MutableRefObject<any> = useRef()
  const columns = Object.entries(nodeSettingsState.columnFilter.columns)
      .filter(([k, v]) => v)
      .map(([v, i]) => v)
  // const imputerOptions = ['mean', 'median', 'most_frequent', 'constant']
  const types = ['rf_classify', 'rf_regress']
    const onClickHandle = () => {
        nodeSettingsDispatch({
            type: id,
            value: {
                test_size: (testSize.current.value === '' || testSize.current.value <= 0) ?
                    0.2 : testSize.current.value,
                n_estimators: nEstimator.current.value !== '' ? nEstimator.current.value : 100,
                random_state: randomStateRef.current.value !== '' ? randomStateRef.current.value : null,
                settingsActive: false
            }
        })
    }
  const Component:React.FC = ()=>{

    return(
        <div className='flex flex-col justify-center items-center w-[100%] h-[60vh] p-[1rem]'>
          <form className='flex flex-col justify-start items-start gap-[2rem] w-[100%]'>
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
                disable={nodeSettingsState[id].type == 'rf_classify' && true}
                description={'Impute Method (Regression)'}
                // selectionRef={algorithmRef}
                value={nodeSettingsState[id].imputer_strategy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  nodeSettingsDispatch({type: id, value: {imputer_strategy: e.target.value,}})
                }}
            /> */}
            <InputComponent
                description={'Random State, default: None'}
                inputRef={randomStateRef}
                placeholder={nodeSettingsState[id].random_state}
            />

            <InputComponent
                description={'n Estimator, default: 100'}
                inputRef={nEstimator}
                placeholder={nodeSettingsState[id].n_estimators}
            />

            <InputComponent
                description={'Test size, default: 20'}
                inputRef={testSize}
                placeholder={nodeSettingsState[id].test_size}
            />

          </form>
        </div>
    )
  }

  return (
      <SettingsPanel title='Random Forest Configuration' id={id} saveBtnClickHandle={onClickHandle}>
        {checkNodeConnected ?  <Component/> : <NodeNotConnected/>}
      </SettingsPanel>
  )
}

export default RandomForest