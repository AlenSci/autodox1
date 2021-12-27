import React, {useState} from 'react'
import {Transforms} from 'slate'
import {ReactEditor, useSlate} from 'slate-react'

import RichTextEditor from './richtext'
import {EditableVoidElement} from './custom-types'
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedTooltips from "./components/tool_tip";


export const withEditableVoids = (editor: any) => {
    const {isVoid} = editor

    editor.isVoid = (element: any) => {
        return element.type === 'editable-void' ? true : isVoid(element)
    }

    return editor
}


const EditableVoid = (props: any) => {
    const editor = useSlate()
    const {attributes, children, element}: any = props
    const [inputValue, setInputValue] = useState('')
    const buttons = [{
        icon: <AddIcon/>,
        title: 'delicate',
    }]

    const options = [{
        icon: <DeleteIcon/>,
        title: 'delete',
    }]
    var target: any = document.getElementById(element.id)
    target = target ? ReactEditor.toSlateNode(editor, target) : null
    target = target && ReactEditor.findPath(editor, target)

    return (
        // Need contentEditable=false or Firefox has issues with certain input types.
        <div id={element.id} {...attributes} contentEditable={false}>
            <CustomizedTooltips path={target}>
                <RichTextEditor path={target} main_ditor={editor} initialValue={element.children}/>
            </CustomizedTooltips>


            {children}
        </div>
    )
}

export {
    EditableVoid
}