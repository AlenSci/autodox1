import React, { useState, useCallback, useMemo } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import {
  Transforms,
  createEditor,
  Node,
  Element as SlateElement,
  Descendant,
} from 'slate'
import { withHistory } from 'slate-history'
import { ParagraphElement, TitleElement } from './custom-types'
import {EditableVoid, insertEditableVoid, withEditableVoids} from "./editable-voids";
import {Button, Icon} from "./components";

const withLayout = (editor:any) => {
  const { normalizeNode } = editor

  editor.normalizeNode = ([node, path]:any) => {
    if (path.length === 0) {
      if (editor.children.length < 1) {
        const title: TitleElement = {
          type: 'title',
          children: [{ text: 'Untitled' }],
        }
        Transforms.insertNodes(editor, title, { at: path.concat(0) })
      }

      if (editor.children.length < 2) {
        const paragraph: ParagraphElement = {
          type: 'paragraph',
          children: [{ text: '' }],
        }
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
      }

      // @ts-ignore
        for (const [child, childPath] of Node.children(editor, path)) {
        let type: string
        const slateIndex = childPath[0]
        const enforceType = (type:any) => {
          if (SlateElement.isElement(child) && child.type !== type) {
            const newProperties: Partial<SlateElement> = { type }
            Transforms.setNodes<SlateElement>(editor, newProperties, {
              at: childPath,
            })
          }
        }

            // @ts-ignore
            switch (slateIndex) {
          case 0:
            type = 'title'
            enforceType(type)
            break
                            // @ts-ignore
          case 1:
            type = 'paragraph'
            enforceType(type)
                                // @ts-ignore
          default:
            break
        }
      }
    }

    return normalizeNode([node, path])
  }

  return editor
}

const ForcedLayout = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  // @ts-ignore
    const renderElement:any = useCallback((props:any) => <Element {...props} />, [])
  const editor = useMemo(
    () => withEditableVoids(withLayout(withHistory(withReact(createEditor())))),
    []
  )
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Button
      onMouseDown={(event:any) => {
        event.preventDefault()
        insertEditableVoid(editor)
      }}
    >
      <Icon>add</Icon>
    </Button>

      <Editable
        renderElement={renderElement}
        placeholder="Enter a title…"
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

const Element = (props:any) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'editable-void':
      return <EditableVoid {...props} />
    case 'title':
      return <h2 {...attributes}>{children}</h2>
    case 'paragraph':
      return <p {...attributes}>{children}</p>
  }
}

const initialValue: any[] = [
  {
    type: 'title',
    children: [{ text: 'title sample is here.' }],
  },
    {
    type: 'editable-void',
    children: [
              {
              type: 'paragraph',
              children: [
              { text: 'This is editable text' },
              ],
              },
              ],
  },
]

export default ForcedLayout
