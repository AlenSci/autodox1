import React from 'react'
import {Route} from "react-router-dom";
import Autodox from "../apps/text_editor3/App";

function TextEditor2() {
  // let { username }: any = useParams()

    return (
        <Route path="/text_editor_3">
            <Autodox/>
        </Route>
    );
}

export default TextEditor2
