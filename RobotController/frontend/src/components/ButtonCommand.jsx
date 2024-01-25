import React from 'react'
import { useButtons } from '../contexts/ButtonsContext';
import { setDoc, doc, serverTimestamp, collection } from 'firebase/firestore'
import { db } from "../firebase";

const ButtonCommand = ({description, actionName}) => {
  const { Modes } = useButtons()
  const actionRef = collection(db, "Actions");

  const buttonClick = async () => {
    const actionDocRef = doc(actionRef);
    setDoc(actionDocRef, {
      action: actionName,
      priority: 1,
      createdAt: serverTimestamp()
    })
  }

  return (
    <>
      <div className='flex flex-row w-full justify-start items-center'>
        <div className='flex h-full items-center justify-center'>
          <button 
            onClick={buttonClick} 
            className={`${!Modes["manual"].get ? 'bg-[#b69082]' : 'bg-[#F5C3AF]'} hover:bg-[#b69082] text-norm text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
            disabled={!Modes["manual"].get}
          >
            O
          </button>
        </div>
        <div className='text-white font-bold ml-4'>{description}</div>
      </div>
    </>
  )
}

export default ButtonCommand