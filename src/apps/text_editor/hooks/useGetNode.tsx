import React, {useRef} from "react";
import {ReactEditor, useSlate} from "slate-react";

const useGetNode = () => {
    const ref: any = useRef<HTMLDivElement | null>();
    const editor: any = useSlate()

    const getTarget = () => {
        try {
            return ReactEditor.toSlateNode(editor, ref.current)
        } catch (e) {
            console.error(e)
        }
    };

    return [ref, getTarget]
};
export default useGetNode;
