import {Transforms} from "slate";
import {ReactEditor, useSlateStatic} from "slate-react";
import {useRef} from "react";

export default  function useUpdateNode(props:any){
    const ref: any = useRef<HTMLDivElement | null>();
    const editor = useSlateStatic()
    var target: any = null
    var path: any = null
    try {
    target = ReactEditor.toSlateNode(editor, ref.current)
    } catch (e) {
    console.error(e)
    }

    path = target ? ReactEditor.findPath(editor, target): null
    const makeUdate = (update:any, pathF:Function)=>{
        if (pathF){
            path = pathF(path)
        }
        path && Transforms.setNodes(editor, { ...props.element, ...update},{at:path})
    }
    return [ref, makeUdate]
}