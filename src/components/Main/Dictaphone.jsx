import React, { useState, useContext, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context'

const Dictaphone = () => {
    
    const {setInput} = useContext(Context);

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [isListening, setIsListening] = useState(false);

    useEffect(()=>{
        setInput(transcript)
    }, [transcript, setInput])
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleMicClick = () => {
        
        setIsListening(!isListening);
        if (isListening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening();
            
        }
    };
    
    return (
      <div className='mic-icon'>
        <img 
            onClick={handleMicClick } 
            src={assets.mic_icon} alt=""
            className={listening ? 'mic-active' : ''}
        />
      </div>
    );
};

export default Dictaphone