import React from 'react'
import Up from "../assets/Directions/Up.png"
import Down from "../assets/Directions/Down.png"
import Right from "../assets/Directions/Right.png"
import Left from "../assets/Directions/Left.png"

const DPad = () => {
  return (
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className="grid grid-cols-3 gap-1 p-1">
            <div/>
            <button className="bg-[#F5C3AF] hover:bg-[#b69082] rounded p-2">
                <img src={Up} className='w-6 h-6'/>
            </button>
            <div/>
            <button className="bg-[#F5C3AF] hover:bg-[#b69082] rounded p-2">
                <img src={Left} className='w-6 h-6'/>
            </button>
            <button className="bg-[#F5C3AF] hover:bg-[#b69082] rounded p-2">
                <div className='w-6 h-6 text-black font-bold'>O</div>
            </button>
            <button className="bg-[#F5C3AF] hover:bg-[#b69082] rounded p-2">
                <img src={Right} className='w-6 h-6'/>
            </button>
            <div/>
            <button className="bg-[#F5C3AF] hover:bg-[#b69082] rounded p-2">
                <img src={Down} className='w-6 h-6'/>
            </button>
            <div />
        </div>
        <div className='flex-1'>
            <span className='font-bold'>Control Robot Movements</span> <br></br>
            (Once movement is selected use the center button to the end the action.)
        </div>
    </div>
  )
}

export default DPad