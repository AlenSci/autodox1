import React from 'react'
import Inbox from './Inbox'
import SendEmail from "./api";
import Profile from './profile'
import Draft from "./Draf";
import TextEditor2 from "./TextEditor2";

function Pages() {
    // console.log(AllPages.Inbox)
    return (
      <div>
          <TextEditor2/>
          <Inbox/>
          <SendEmail/>
          <Profile/>
          <Draft/>
      </div>
  );
}

export default Pages
