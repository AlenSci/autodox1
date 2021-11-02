import React, {useCallback, useMemo, useState} from 'react'
import {Editable, Slate, withReact,} from 'slate-react'
import {createEditor, Descendant, Editor, Element as SlateElement, Point, Range, Transforms,} from 'slate'
import {withHistory} from 'slate-history'
import {withMyPlugin} from "./plugins/other";
import initialValue from "./components/initialValue";
import {withHtml} from "./components/paste-html";
import Element from './components/element'
import {HoveringToolbar, Leaf, toggleFormat} from "./components/hovering-toolbar";
import useMention from "./hooks/use_mentions";
import {CHARACTERS, insertMention, withMentions} from "./inserts/mentoin_element";
import {components_elements, insertElement} from "./inserts/elements";

const CheckListsExample = () => {
    const [value, setValue] = useState<Descendant[]>(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const editor = useMemo(
        () => withMentions(withHtml(withChecklists(withHistory(withReact(withMyPlugin(createEditor())))))),
        []
    )

    const [onChange, onKeyDown, Menu]: any = useMention(editor, /^@(\w+)$/, CHARACTERS, insertMention)
    const [onChange_E, onKeyDown_E, Menu_E]: any = useMention(editor, /^\/(\w+)$/, Object.keys(components_elements), insertElement)

    return (
        <Slate editor={editor} value={value} onChange={value => {
            setValue(value)
            onChange()
            onChange_E()
        }}>
            <HoveringToolbar/>
            <Menu_E/>
            <Menu/>
            <Editable
                onKeyDown={(e:any) => {
                    onKeyDown(e)
                    onKeyDown_E(e)
                }}

                renderLeaf={props => <Leaf {...props} />}
                onDOMBeforeInput={(event: InputEvent) => {
                    // event.preventDefault()
                    switch (event.inputType) {
                        case 'formatBold':
                            return toggleFormat(editor, 'bold')
                        case 'formatItalic':
                            return toggleFormat(editor, 'italic')
                        case 'formatUnderline':
                            return toggleFormat(editor, 'underlined')
                    }
                }}
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
