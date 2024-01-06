import React from 'react'
import Save from "../assets/Buttons/Save.png"

const UpdateSettings = () => {
  return (
    <div className='flex justify-center'>
        <button 
            className="bg-[#F5C3AF] hover:bg-[#b69082] text-norm text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-shadow flex flex-row items-center gap-2"
        >
            <img src={Save} className='w-6'/>
            Update Settings
        </button>
    </div>
  )
}

export default UpdateSettings