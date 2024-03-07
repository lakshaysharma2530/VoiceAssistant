import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import listen from "./listen.svg"
import "./mic.css"
import listeningAnim from "./listening-anim.mp4"
import axios from 'axios';
import { API } from '../config';
import Speech from 'speak-tts'

const Dictaphone = () => {
  const [reply,setReply]=useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  axios.defaults.baseURL=API;
  const [res,setRes]=useState()
  

  

    useEffect(()=>{
      const fetchdata= async()=>{
      if(transcript!=="" && listening===false){

        try {
          const query={transcript}.transcript
          const { data } = await axios.get(`/ask?query=${query}`);
          setRes(data)

        } catch (error) {
          console.error("Error fetching data:", error);

      }}}
      
      fetchdata()
      
    },[listening,transcript])


    useEffect(() => {
    const speech = () => {
      const say =new Speech()
      if (res && res.answer !== undefined) {
        console.log(res.answer);
        say.speak({ text: res.answer})
          setReply(res.answer)
          }
      }
    speech();
  }, [res]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  const Icon=()=>{
    return(
      <div className='container '>
      <div className='wrapper'> 
        <img onClick={listening ? ()=>{SpeechRecognition.stopListening(); resetTranscript(); } :()=>{SpeechRecognition.startListening(); resetTranscript();setReply("");}} className="mic" width="35px" height="35px" src={listen} alt='/'/>
      </div>
      </div>
    )
  }
  return (
    <div className='relative'>
      <div className='upr-div'>
        <div className='listenanim'>
          {listening? <video className='vdo' src={listeningAnim} autoPlay loop /> :"" }
        </div>
      <p className='text'>{transcript}</p>
      <p id='answer' style={{color:"white"}}>{reply}</p>
      </div>
      <Icon/>
    </div>
  );
};
export default Dictaphone;