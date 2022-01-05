import React from 'react'
import Inbox from './Inbox'
import SendEmail from "./api";
import Profile from './profile'
import Draft from "./Draf";
import TextEditor2 from "./TextEditor2";
import TextEditor3 from './TextEditor3';
// import * as All from './'
function Pages() {
    return (
      <div>
          <TextEditor3/>
          <TextEditor2/>
          <Inbox/>
          <SendEmail/>
          <Profile/>
          <Draft/>
      </div>
  );
}

export default Pages
