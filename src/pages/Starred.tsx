import React from 'react'
import {Route} from "react-router-dom";
import LatestComment from "../components/lastcomment";
import Chat from "../components/chat";
import CheckListsExample from "../apps/text_editor/text_editor";

function Starred() {
  // let { username }: any = useParams()

    return (
        <Route path="/Starred">
            <CheckListsExample/>


            <Chat/>

            <LatestComment/>
        </Route>
    );
}

export default Starred
