import React from 'react'
import Inbox from './Inbox'
import SendEmail from "./api";
import Profile from './profile'
import Draft from "./Draf";
import TextEditor3 from './TextEditor3';
import TextEditor4 from "./TextEditor4";

// import * as All from './'
function Pages() {
    return (
        <div>
            <TextEditor4/>
            <TextEditor3/>
            <Inbox/>
            <SendEmail/>
            <Profile/>
            <Draft/>
        </div>
    );
}

export default Pages
