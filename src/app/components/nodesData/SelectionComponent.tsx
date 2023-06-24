import React from 'react'

function SelectionComponent({disable=false, dataArr, description, selectionRef,value, onChange}) {
  return (
     <div className='flex flex-row justify-between w-[100%] items-center gap-[1rem]'>
      <p>{description}</p>
     <select disabled={disable} ref={selectionRef} onChange={onChange} value={value} name="selectTypes" id="selectTypes" className='bg-slate-400 p-[0.5rem] rounded-md'>
        {dataArr.map((v:string) => (
          <option key={v} value={v}>
          {v}
        </option>
        ))}
      </select>
     </div>
  )
}

export default SelectionComponent