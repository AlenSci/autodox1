import {ReactEditor, useSlate} from "slate-react";
import {Editor} from "slate";

const getNode = (target:HTMLElement, editor:Editor)=>{
    const node = ReactEditor.toSlateNode(editor, target)
    const path = node && ReactEditor.findPath(editor, node)
    return [node, path]
}
export  default getNode