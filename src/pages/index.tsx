import React from 'react'
import Inbox from './Inbox'
import Starred from "./Starred";
import SendEmail from "./send_email";
import Profile from './profile'

function Pages() {
    // console.log(AllPages.Inbox)
    return (
      <div>
          <Inbox/>
          <Starred/>
          <SendEmail/>
          <Profile/>
      </div>
  );
}

export default Pages
