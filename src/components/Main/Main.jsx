import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import Dictaphone from './Dictaphone'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">

                { !showResult 
                ?<>
                    <div className="greet">
                        <p>
                            <span>
                                Hello :D
                            </span>
                        </p>
                        <p>
                            How can I help you today?
                        </p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>
                                Suggest beautiful websites for buy shoes from
                            </p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>
                                Suggest beautiful places for visit in summer
                            </p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>
                                Tell me more about Venus impact in astrology
                            </p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>
                                What is the best time to invest in real estate?
                            </p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                    
                </>
                :
                <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ? 
                            <> 
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            </> 
                            : 
                            <p dangerouslySetInnerHTML={{__html:resultData}}></p> 
                        }
                       
                    </div>
                </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e)=>setInput(e.target.value)} 
                            value={input}
                            type="text" 
                            placeholder='Enter a prompt here' 
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <Dictaphone />
                            {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default Main