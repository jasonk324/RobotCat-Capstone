import React from 'react'
import Switch from 'react-switch';

const SwitchMode = ({handleChange, isSwitched, description}) => {
  return (
    <div className='flex items-center justify-start gap-3'>
        <Switch onChange={handleChange} checked={isSwitched} />
        <span>{description}</span>
    </div>
  )
}

export default SwitchMode