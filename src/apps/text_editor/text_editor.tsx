import React, {useCallback, useMemo, useState} from 'react'
import {Editable, Slate, withReact,} from 'slate-react'
import {createEditor, Descendant, Editor, Element as SlateElement, Point, Range, Transforms,} from 'slate'
import {withHistory} from 'slate-history'
import {withMyPlugin} from "./plugins/other";
import initialValue from "./initialValue";
import {withHtml} from "./paste-html";
import Element from './element'

const CheckListsExample = () => {
    const [value, setValue] = useState<Descendant[]>(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const editor = useMemo(
        () => withHtml(withChecklists(withHistory(withReact(withMyPlugin(createEditor()))))),
        []
    )
    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Editable
                renderElement={renderElement}
                placeholder="Get to work…"
                spellCheck
                autoFocus
            />
        </Slate>
    );
};

const withChecklists = (editor:any) => {
  const { deleteBackward } = editor

  editor.deleteBackward = (...args:any) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [match]:any = Editor.nodes(editor, {
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


export default CheckListsExample
