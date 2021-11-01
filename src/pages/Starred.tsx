import React from 'react'
import {Route} from "react-router-dom";
import LatestComment from "../components/lastcomment";
import Chat from "../components/chat";
import CheckListsExample from "../apps/text_editor/text_editor";
import {ApolloProvider} from "@apollo/client";

function Starred() {
  // let { username }: any = useParams()

  return (
      <Route path="/Starred">
        <LatestComment/>
            <Chat/>
            <CheckListsExample/>
      </Route>
  );
}

export default Starred
