import React from 'react'
import {Route} from "react-router-dom";
import TextEditor from "../apps/text_editor2";

function TextEditor2() {
  // let { username }: any = useParams()

    return (
        <Route path="/text_editor_2">
            <TextEditor/>
        </Route>
    );
}

export default TextEditor2
