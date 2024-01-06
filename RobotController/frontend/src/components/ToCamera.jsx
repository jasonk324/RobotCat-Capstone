import React from 'react'
import CameraIcon from "../assets/Buttons/Camera.png"

const ToCamera = () => {
  return (
    <div>
        <button 
            className="bg-[#EA89D7] hover:bg-[#a35f96] text-norm text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-shadow flex flex-row items-center gap-2"
        >
            <img src={CameraIcon} className='w-6'/>
            Camera View
        </button>
    </div>
  )
}

export default ToCamera