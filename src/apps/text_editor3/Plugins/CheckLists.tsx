import {CustomEditor} from "../../text_editor2/custom-types";
import {Editor, Element as SlateElement, Point, Range, Transforms} from "slate";

export const withChecklists = (editor: CustomEditor) => {
    const {deleteBackward} = editor

    editor.deleteBackward = (...args) => {
        const {selection} = editor

        if (selection && Range.isCollapsed(selection)) {
            // @ts-ignore
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === 'check-list-item',
            })

            if (match) {
                const [, path] = match
                const start = Editor.start(editor, path)

                if (Point.equals(selection.anchor, start)) {
                    const newProperties: Partial<SlateElement> = {
                        type: 'paragraph',
                    }
                    Transforms.setNodes(editor, newProperties, {
                        match: n =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            n.type === 'check-list-item',
                    })
                    return
                }
            }
        }

        deleteBackward(...args)
    }

    return editor
}
