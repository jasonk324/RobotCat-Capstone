import React from 'react'
import Switch from 'react-switch';
import { useButtons } from '../contexts/ButtonsContext';

const SwitchMode = ({keyName, description}) => {
  const { Modes } = useButtons()

  const handleSwitch = () => {
    Modes[keyName].set(!Modes[keyName].get)

    switch (keyName) { 
      case "automatic": // In automatic mode
        Modes['manual'].set(Modes[keyName].get);
        break;
      case "manual": // In manual mode
    }
  }

  return (
    <>
      {keyName !== "automatic" && 
        <div className='flex items-center justify-start gap-3'>
          <Switch 
            onChange={handleSwitch} 
            checked={Modes[keyName].get} 
            disabled={!Modes["manual"].get}
          />
          <span>{description}</span>
        </div>
      }
      {keyName === "automatic" && 
        <div className='flex items-center justify-start gap-3'>
          <Switch 
            onChange={handleSwitch} 
            checked={Modes[keyName].get}   
          />
          <span>{description}</span>
        </div>
      }
    </>
  )
}

export default SwitchMode