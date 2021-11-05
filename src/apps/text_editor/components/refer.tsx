import {ReactEditor, useSlate} from "slate-react";
import React, {useState} from "react";
import {Editor, Transforms} from "slate";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ReactJson from "react-json-view";

export const Refer = (props: any) => {
    const editor: any = useSlate()
    var x: any = editor.selection && editor.selection.anchor.path
    const [state, setState] = useState(false)
    const [SELECTION, setSELECTION]: any = useState([])

    if (state) {
        window.addEventListener("mouseover", (e: any) => {
            e.target.style.transition = ' background 1'
            e.target.style.backgroundColor = 'yellow';

        });
        window.addEventListener("mouseout", (e: any) => {
            e.target.style.transition = ' background 1'
            e.target.style.backgroundColor = null
        });
    }

    const handleClickAway = (e: any) => {
        var target: any = null
        try {
            target = ReactEditor.toSlateNode(editor, e.target)
        } catch (e) {
            console.log(e)
        }

        if (state) {
            // Transforms.insertNodes(
            //     editor,
            //     {type: 'paragraph', text: target.text},
            //     {
            //         at: SELECTION,
            //     }
            // )
            Transforms.setNodes(
                editor,
                {data: target, x: x},
                {
                    at: SELECTION,
                }
            )
            setState(false)
            setSELECTION([])
        }
    };
    const handleClick = (e: any) => {
        setState(true)
        setSELECTION(editor.selection)
    }
    const data = props.element.data
    const [match]: any = Editor.nodes(editor, {
        at: [],
        match: (n: any) => {
            return data ? (n.id === data.id) : false
        },
    });
    // const regex = /-.+/gi;
    // const table_id = data.id.replace(regex, '')
    // const table = document.getElementsByTagName('table')
    // console.log({table: table.rows})
    return (
        <ClickAwayListener
            onClickAway={handleClickAway}>
            <div
                onClick={handleClick}
                style={{backgroundColor: 'lightblue'}} {...props.attributes}
            >
                {props.children}
                {/*<ReactJson src={props.element.data} />*/}
                <ReactJson src={match[0].children[0]}/>
                {/*<CheckboxList/>*/}
            </div>
        </ClickAwayListener>);
};