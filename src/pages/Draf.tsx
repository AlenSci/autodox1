import {Route} from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import LeftVert from "../components/LeftVert";
import React, {useState, useEffect} from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import CodeEditor from '../apps/text_editor3/Components/CodeEditor'

function Draft() {
    const [html, seHtml] = useLocalStorage('html', '')
    const [css, setCss] = useLocalStorage('css', '')
    const [js, setJs] = useLocalStorage('js', '')
    const [srcDoc, setstate] = useState(``)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setstate(`
    <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
    </html>
    `)
        }, 250)
        //this will clear timeout while html or js or css changint
        // so it will whait 250 after I finish typing (after change) then it will render.
        return () => clearTimeout(timeout)
    }, [html, js, css])


    // let { username }: any = useParams()
    const options = [{
        icon: <DeleteIcon/>,
        title: 'delete',
    }]

    const buttons = [{
        icon: <AddIcon/>,
        title: 'delicate',
    }]


    return (
        <Route path="/Drafts">

            <div>
                <CodeEditor
                    language="xml"
                    value={html}
                    onChange={seHtml}
                />
                <CodeEditor
                    language="css"
                    value={css}
                    onChange={setCss}
                />
                <CodeEditor
                    language="javascript"
                    value={js}
                    onChange={setJs}
                />
            </div>

            <div className="pane">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                />
            </div>
            <LeftVert
                buttons={buttons}
                options={options}
                button={<MoreVertIcon/>}
            > content x </LeftVert>
        </Route>
    );
}

export default Draft
