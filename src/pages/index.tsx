import React from 'react'
import Inbox from './Inbox'
import Starred from "./Starred";
import SendEmail from "./api";
import Profile from './profile'
import Draft from "./Draf";

function Pages() {
    // console.log(AllPages.Inbox)
    return (
      <div>
          <Inbox/>
          <Starred/>
          <SendEmail/>
          <Profile/>
          <Draft/>
      </div>
  );
}

export default Pages
