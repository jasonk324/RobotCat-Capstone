import React, { useState } from 'react'
import Header from '../components/Header'
import ButtonCommand from '../components/ButtonCommand'
import Audio from "../components/Audio"
import ToCamera from '../components/ToCamera';
import SwitchMode from '../components/SwitchMode';
import UpdateSettings from '../components/UpdateSettings';
import DPad from '../components/DPad';

const Home = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleChange = (checked) => {
    setIsSwitched(checked);
  };

  return (
    <>
			<Header />
			<div className='mt-24 px-2'>
				<div className='w-full flex lg:flex-row flex-col gap-2'>

					<div className='darkGray-box lg:w-[33%] flex flex-col gap-4 p-6 rounded-2xl'>
						<div className='blue-box p-2 rounded-md text-center font-bold'>
							Primary Settings
						</div>
						<div>
							Select Control Mode for the Robot ⚙️
						</div>
						<SwitchMode description={"Manual Mode"} keyName={"manual"} />
						<SwitchMode description={"Automatic Mode"} keyName={"automatic"} />
						<div className="w-full flex flex-col gap-4 pt-3 border-t-[1px] border-t-[#afafaf]">
							Audio input Settings
						</div>
						<SwitchMode description={"Laptop Microphone"} keyName={"pcMic"} />
						<SwitchMode description={"Cat Microphone"} keyName={"catMic"} />
						<div className="w-full flex flex-col gap-4 pt-3 border-t-[1px] border-t-[#afafaf]">
							Voice Settings
						</div>
						<SwitchMode description={"Cat Mode"} keyName={"voiceCat"} />
						<SwitchMode description={"Gym Bro Mode"} keyName={"voiceGym"} />
						<SwitchMode description={"Pirate Mode"} keyName={"voicePirate"} />
						{/* <div>
							<UpdateSettings />
						</div> */}
					</div>
					<div className='darkGray-box lg:w-[33%] flex flex-col gap-4 p-6 rounded-2xl'>
						<div className='blue-box p-2 rounded-md text-center font-bold'>
							Movements
						</div>
						<div>
							One action must be run until completion before the next one can be called.
						</div>
						<div className="w-full flex justify-between items-center flex-col gap-4 py-6 border-t-[1px] border-t-[#afafaf] border-b-[1px] border-b-[#afafaf]">
							<DPad />
						</div>
						<div>
							Additional Movements
						</div>
						<div className='flex flex-row'>
							<ButtonCommand description={"Get up"} actionName={"1"}/>
							<ButtonCommand description={"Smell"} actionName={"2"}/>
						</div>
						<div className='flex flex-row'>
							<ButtonCommand description={"Raise Leg"} actionName={"1"}/>
							<ButtonCommand description={"Spin 360"} actionName={"2"}/>
						</div>
						<div className='flex flex-row'>
							<ButtonCommand description={"Head Left"} actionName={"1"}/>
							<ButtonCommand description={"Head Right"} actionName={"2"}/>
						</div>
					</div>

					<div className='darkGray-box lg:w-[33%] flex flex-col gap-4 p-6 rounded-2xl'>
						<div className='blue-box p-2 rounded-md text-center font-bold'>
							Audio Controls
						</div>
						<div className='lg:flex-1 h-96'>
							<Audio />
						</div>
					</div>

				</div>
				<div className='flex justify-end my-3'>
          <ToCamera />
				</div>

			</div>
		</>
  )
}

export default Home