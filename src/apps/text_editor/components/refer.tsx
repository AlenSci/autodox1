import {ReactEditor, useSlate} from "slate-react";
import React, {useState} from "react";
import {Transforms} from "slate";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ReactJson from "react-json-view";
import FindMatch from "../../../Functions/FindMatch";

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
    const match = FindMatch(editor,(n: any) => data ? (n.id === data.id) : false)

    return (
        <ClickAwayListener
            onClickAway={handleClickAway}>
            <div
                onClick={handleClick}
                style={{backgroundColor: 'lightblue'}} {...props.attributes}
            >
                {props.children}
                <ReactJson src={{match:match}}/>
            </div>
        </ClickAwayListener>);
};