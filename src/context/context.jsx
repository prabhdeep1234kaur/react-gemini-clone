import { createContext, useState } from "react";
import run from "../config/gemini";
//import regenerator Runtime : for the error : occurs when we have await and async func/features.
import 'regenerator-runtime/runtime';



export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); //input from user
    const [recentPrompt, setRecentPrompt] = useState(""); //click on send, save data and display it
    const [prevPrompt, setPrevPrompt] = useState([]); //input history and display in history tab
    const [showResult, setShowResult] = useState(false); // when true, hides greet msg and cards and display results
    const [loading, setLoading] = useState(false); //loader animation
    const [resultData, setResultData] = useState(""); //shows the result from gemini
    
    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    //for new chat
    const newchat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) =>{
        //before getting response
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response; 
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        }else{
            setPrevPrompt(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await run(input);
        }


        //setPrevPrompt(prev=>[...prev, input]);
        //setRecentPrompt(input)
        //this is result
        //response = await run(input)
        let responseArray = response.split("**");
        let newArray = "";
        for(let i=0; i < responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newArray += responseArray[i];
            }else{
                newArray += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse  = newArray.split("*").join("</br>")
        let newResponseArr = newResponse.split( " " );
        for(let i=0 ; i < newResponseArr.length; i++){
            const nextWord = newResponseArr[i];
            delayPara(i, nextWord+" ");
        }
        //after getting response
        setLoading(false)
        setInput("")//reset field

    }
    //onSent("What is React JS?");

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newchat
        
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider