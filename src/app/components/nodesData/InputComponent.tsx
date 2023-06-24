import React from 'react'

function InputComponent ({description, placeholder, inputRef}) {
  return (
    <div className='flex flex-row justify-between items-center gap-[2rem] w-[100%]'>
      <p>{description}</p>
      <input
        ref={inputRef}
        className='bg-slate-400 border-none p-[1rem] text-white placeholder-white/50 w-[40%] rounded-md'
        type='number'
        placeholder={placeholder}

      />
    </div>
  )
}

export default InputComponent
