import React, { useEffect, useState } from 'react';
import './main.css';
import userName from '../../assets/userName.jpg'
import { LiaCompass } from "react-icons/lia";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { RiMessage2Line } from "react-icons/ri";
import { IoCodeSlashOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { BiMicrophone } from "react-icons/bi";
import { LuSendHorizonal } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
// import { SiGooglegemini } from "react-icons/si";
import runChat from "../../config/gemini";

const Main = () => {

    const [input, setInput] = useState("");
    const [recentPrompt, setResentPrompt] = useState("");
    const [previousPromts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }


    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setResentPrompt(input)
        setPreviousPrompts(prev => [...prev, input])
        const response = await runChat(input)
        let responseArray = response.split("**");
        let newResponse;
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setResultData(newResponse2)
        setLoading(false)
        setInput("")
    }

    return <>
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <FaUser className='userimage' />
            </div>
            <div className="main-container">

                {!showResult ? <> <div className="greet">
                    <p><span>Hello.</span></p>
                    <p>How can I help you today?</p>
                </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <span className="compass">
                                <LiaCompass className='m-icon' />
                            </span>
                        </div>
                        <div className="card">
                            <p>Briefly summarize this concept: urban planning</p>
                            <span className="compass">
                                <HiOutlineLightBulb className='m-icon' />
                            </span>
                        </div>
                        <div className="card">
                            <p>Brainstorm team bonding activities for our work retreat</p>
                            <span className="compass">
                                <RiMessage2Line className='m-icon' />
                            </span>
                        </div>
                        <div className="card">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <span className="compass">
                                <IoCodeSlashOutline className='m-icon' />
                            </span>
                        </div>
                    </div>

                </> : <div className='result'>
                    <div className='result-title'>
                        <FaUser className='user-icon' />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        {/* <SiGooglegemini /> */}
                        {loading ? <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                            : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
                    </div>
                </div>

                }



                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter prompt here...' />
                        <div>
                            <LuImagePlus className='search-boc-i' />
                            <BiMicrophone className='search-boc-i' />
                            <LuSendHorizonal className='search-boc-i' onClick={() => onSent()} />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display incorrect info, including about people, so double-check it's responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default Main;