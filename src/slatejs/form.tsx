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
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

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
        const slateIndex: number = childPath[0]
        const enforceType = (type:any) => {
          if (SlateElement.isElement(child) && child.type !== type) {
            const newProperties: Partial<SlateElement> = { type }
            Transforms.setNodes(editor, newProperties, { at: childPath })
          }
        }

        switch (slateIndex) {
          case 0:
            type = 'title'
            enforceType(type)
            break
          case 1:
            type = 'paragraph'
            enforceType(type)
            break
          default:
            break
        }
      }
    }

    return normalizeNode([node, path])
  }

  return editor
}


const Elements:any = ({ attributes, children, element }:any) => {
  switch (element.type) {
    case 'title':
      return <div type={'password'} {...attributes}>{children}<Divider/></div>
    case 'paragraph':
      return <div  type={'password'} {...attributes}>{children}</div>
  }
}


const ForcedLayoutExample = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  // const renderElement:any = useCallback((props:any) => <TextField {...props} id="standard-basic" label="Username" variant="standard"/>, [])
  const renderElement:any = useCallback((props:any) => <Elements {...props}/>, [])
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  )
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        placeholder="Username"
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'title',
    children: [{ text: ''}],
  },
    {
    type: 'title',
    children: [{ text: ''}],
  },
]

export default ForcedLayoutExample
