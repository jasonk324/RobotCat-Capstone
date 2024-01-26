import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import MicOff from "../assets/AudioIcons/MicOff.png"
import MicOn from "../assets/AudioIcons/MicOn.png"
import Refresh from "../assets/Buttons/Refresh.png"
import Upload from "../assets/Buttons/Upload.png"
import HelloKitty from "../assets/Logos/HelloKittyBlackIcon.png"
import { useButtons } from '../contexts/ButtonsContext'
import { setDoc, doc, serverTimestamp, collection, onSnapshot  } from 'firebase/firestore'
import { db } from "../firebase";
import { getCookie } from './GetCookie'

const Audio = () => {
    const { Audio, Modes } = useButtons()
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
	const messageRef = collection(db, "Messages");
    
	// Work in progress
	// const csrftoken = getCookie('csrftoken');

	// Work in progress
    // const sendTranscript = async () => {
    //     let formData = new FormData()
    //     formData.append("newConvo", Audio["newConvo"].get)
    //     formData.append("transcript", Audio["transcript"].get)

    //     await fetch(`http://127.0.0.1:5000/chatGPT`, {
    //         method: "POST",
    //         headers: {
    //           'X-CSRFToken': csrftoken
    //         },
    //         body: formData,
    //       })
    // }

	// Work in progress
    // const testing = async () => {
    //     let response = await fetch(`http://127.0.0.1:5000/testing`)
    //     let pk_data = await response.json()
    //     console.log(pk_data)
    // }

    useEffect(() => {
        Audio["transcript"].set(transcript)
    }, [transcript])

    useEffect(() => {
        Audio['listening'].set(listening)
    }, [listening])

    useEffect(() => {
        if (listening === false) {
            // console.log("Hello dawg");
            // console.log(Audio['newConvo'].get);
            // testing();
            // sendTranscript();
            Audio['newConvo'].set(false);
        } 
    }, [listening])

    // let listenEnding = () => {
    //     let unsubscribe;
    //     const currentTime = new Date();

    //     if (Audio['listening'].get && Modes['catMic'].get === true) {
    //         unsubscribe = onSnapshot(messageRef, (snapshot) => {
    //             const newData = snapshot.docs
    //             .filter((doc) => !doc.data().createdAt || doc.data().createdAt.toMillis() > currentTime)
    //             .map((doc) => ({
    //                 ...doc.data(),
    //             }));
    //             console.log(newData)
    //             return
    //             // Audio['transcript'].set(newData);
    //         });
    //     };

    //     return () => {
    //         if (unsubscribe) {
    //             unsubscribe();
    //         }
    //     }
    //   }

    const listenEnding = async () => {
        let heardString = ""
        console.log("listening for the ending")
      
        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(messageRef, (snapshot) => {
                const changes = snapshot.docChanges();
                for (const change of changes) {
                    const newDocument = change.doc.data();

                    const createdAt = newDocument.createdAt.toMillis(); 
                    const oneMinAgo = Date.now() - 10 * 1000;

                    if (createdAt > oneMinAgo) { 

                        console.log('New Document:', newDocument);
                        if (newDocument['message'] === 'complete1') {
                            Audio['listening'].set(false);
                            Audio['transcript'].set(heardString);
                            resolve(newDocument);
                            unsubscribe(); 
                        } else if (newDocument['message'] !== 'listen1') {
                            heardString = newDocument['message']
                        }

                    }
                }   
            }, (error) => {
                reject(error);
            });
        });
    };

	const handleUpload = () => {
		const messageDocRef = doc(messageRef);
		setDoc(messageDocRef, {
		  message: Audio['transcript'].get,
		  location: "React",
		  createdAt: serverTimestamp()
		})

		Audio['transcript'].set("");
	}

    const handleRefresh = () => {
        Audio['newConvo'].set(true);
        Audio["response"].set("");
        Audio["transcript"].set("");
        resetTranscript();        
    }

	const handleMicOn = async () => {
		if (Modes['pcMic'].get === true) { // In laptop mode
			SpeechRecognition.startListening();
		} else { // cat mic
            Audio['listening'].set(true);
			const messageDocRef = doc(messageRef);
			setDoc(messageDocRef, {
			  message: "listen1",
			  location: "React",
			  createdAt: serverTimestamp()
			})
            listenEnding();
		}
	}

	const handleMicOff = () => {
		if (Modes['pcMic'].get === true) { // In laptop mode
			SpeechRecognition.stopListening();
		} 
	}
  
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
      <>
        <div className='flex flex-col gap-3 h-full'>
            <div className='flex flex-row gap-3 h-[45%]'>
                <div className='flex flex-col gap-3'>
                    {Audio['listening'].get ? (
                        <button className='bg-[#F5C3AF] hover:bg-[#b69082] p-3 rounded-full' onClick={handleMicOff}>
                            <img src={MicOff} className='w-12'/>
                        </button>
                    ) : (
                        <button className='bg-[#F5C3AF] hover:bg-[#b69082] p-3 rounded-full' onClick={handleMicOn}>
                            <img src={MicOn} className='w-12'/>
                        </button>
                    )
                    }
					<button 
						onClick={handleUpload}
						className={`${!Modes["pcMic"].get ? 'bg-[#b69082]' : 'bg-[#F5C3AF]'} hover:bg-[#b69082] p-3 rounded-full`}
                        disabled={!Modes["pcMic"].get}
					>
						<img src={Upload} className='w-12'/>
					</button>
                </div>
                <div className='bg-[#FFFFFF] text-black rounded-md p-3 w-full h-full overflow-auto'>
                    {Audio["transcript"].get ? (
                        <p>{Audio["transcript"].get}</p>
                    ) : (
                        <p>Transcript will appear here...</p>
                    )}
                </div>
            </div>
            <div className='flex flex-row gap-3 h-[45%]'>
                <div className='bg-[#FFFFFF] text-black rounded-md p-3 w-full h-full overflow-auto'>
                    {Audio["response"].get ? (
                        <p>{Audio["response"].get}</p>
                    ) : (
                        <p>Cat's Response...</p>
                    )}
                </div>
                <div>
                    <div className='bg-[#b69082] p-3 rounded-full'>
                        <img src={HelloKitty} className='w-12'/>
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-2'>
                <button 
                    onClick={handleRefresh}
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