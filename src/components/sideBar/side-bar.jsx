import React, { useState } from 'react';
import './side-bar.css';
import { FiMenu } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { BiMessageDetail } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { GoHistory } from "react-icons/go";
import { SlSettings } from "react-icons/sl";

const SideBarComp = () => {

    const [extended, setExtended] = useState(false);
    const handleMenu = () => {
        if (extended === false) {
            setExtended(true);
        }
        else {
            setExtended(false);
        }
    }

    return <div className={`sidebar ${extended ? '' : 'shrink'}`}>
        <div className='top'>
            <span className='menu'><FiMenu className='icons menu-i' onClick={handleMenu} /></span>
            <div className="new-chat">
                <span className='plus-icon'><FaPlus className='icons plus-i' /></span>
                {extended ? <p>New Chat</p> : null}
            </div>
            {extended ? <div className="recent">
                <p className="recent-title">Recent</p>
                <div className="recent-entry">
                    <span className="message-icon">
                        <BiMessageDetail className='icons message-i' />
                    </span>
                    <p>What is React...</p>
                </div>
            </div> : null}

        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <span className="question-icon">
                    <BsQuestionCircle className='icons bottom-i' />
                </span>
                {extended ? <p>Help</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <span className="question-icon">
                    <GoHistory className='icons bottom-i' />
                </span>
                {extended ? <p>Activity</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <span className="question-icon">
                    <SlSettings className='icons bottom-i' />
                </span>
                {extended ? <p>Settings</p> : null}
            </div>
        </div>
    </div>
};

export default SideBarComp;