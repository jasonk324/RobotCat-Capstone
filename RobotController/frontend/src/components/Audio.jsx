import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import MicOff from "../assets/AudioIcons/MicOff.png"
import MicOn from "../assets/AudioIcons/MicOn.png"
import Refresh from "../assets/Buttons/Refresh.png"
import HelloKitty from "../assets/Logos/HelloKittyBlackIcon.png"

const Audio = () => {
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
    return (
      <>
        <div className='flex flex-col gap-3 h-full'>
            <div className='flex flex-row gap-3 h-[45%]'>
                <div>
                    {listening ? (
                        <button className='bg-[#F5C3AF] hover:bg-[#b69082] p-3 rounded-full' onClick={SpeechRecognition.stopListening}>
                            <img src={MicOn} className='w-12'/>
                        </button>
                    ) : (
                        <button className='bg-[#F5C3AF] hover:bg-[#b69082] p-3 rounded-full' onClick={SpeechRecognition.startListening}>
                            <img src={MicOff} className='w-12'/>
                        </button>
                    )
                    }
                </div>
                <div className='bg-[#FFFFFF] text-black rounded-md p-3 w-full h-full overflow-auto'>
                    {transcript ? (
                        <p>{transcript}</p>
                    ) : (
                        <p>Transcript will appear here</p>
                    )}
                </div>
            </div>
            <div className='flex flex-row gap-3 h-[45%]'>
                <div className='bg-[#FFFFFF] text-black rounded-md p-3 w-full h-full overflow-auto'>
                    Hello
                    {/* {transcript ? (
                        <p>{transcript}</p>
                    ) : (
                        <p>Transcript will appear here</p>
                    )} */}
                </div>
                <div>
                    <div className='bg-[#F5C3AF] hover:bg-[#b69082] p-3 rounded-full'>
                        <img src={HelloKitty} className='w-12'/>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button 
                    className="bg-[#F5C3AF] hover:bg-[#b69082] text-norm text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-shadow flex flex-row items-center gap-2"
                >
                    <img src={Refresh} className='w-6'/>
                    Refresh Conversation
                </button>
            </div>
        </div>
      </>
    );
  };
  export default Audio;