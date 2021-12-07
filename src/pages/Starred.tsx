import React from 'react'
import {Route} from "react-router-dom";
import LatestComment from "../components/lastcomment";
import Chat from "../components/chat";
import RichTextEditor from "../apps/text_editor/text_editor";

function Starred() {
  // let { username }: any = useParams()

    return (
        <Route path="/Starred">
            <RichTextEditor id={1}/>
            {/*<RichTextEditor id={2}/>*/}
            <Chat/>

            <LatestComment/>
        </Route>
    );
}

export default Starred
