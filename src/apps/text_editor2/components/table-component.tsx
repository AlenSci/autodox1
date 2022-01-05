import React, {useState} from 'react'
import {ReactEditor, useSlate} from 'slate-react'
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedTooltips from "./tool_tip";
import FullFeaturedDemo from "./table";


export const withEditableTable = (editor: any) => {
    const {isVoid} = editor

    editor.isVoid = (element: any) => {
        return element.type === 'table' ? true : isVoid(element)
    }

    return editor
}


const TableComponent = (props: any) => {
    const editor = useSlate()
    const {attributes, children, element}: any = props
    // const [inputValue, setInputValue] = useState('')
    // const buttons = [{
    //     icon: <AddIcon/>,
    //     title: 'delicate',
    // }]
    //
    // const options = [{
    //     icon: <DeleteIcon/>,
    //     title: 'delete',
    // }]
    var target: any = document.getElementById(element.id)
    target = target ? ReactEditor.toSlateNode(editor, target) : null
    target = target && ReactEditor.findPath(editor, target)

    return (
        // Need contentEditable=false or Firefox has issues with certain input types.
        <div id={element.id} {...attributes}
        contentEditable={false}
        >
            <CustomizedTooltips main_editor={editor} path={target}>
                <FullFeaturedDemo/>
            </CustomizedTooltips>


            {children}
        </div>
    )
}

export {
    TableComponent
}