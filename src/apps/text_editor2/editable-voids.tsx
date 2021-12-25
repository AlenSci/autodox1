import React, { useState, useMemo } from 'react'
import {Transforms, createEditor, Descendant, Editor} from 'slate'
import { Slate, Editable, useSlateStatic, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { css } from '@emotion/css'

import RichTextEditor from './richtext'
import { Button, Icon, Toolbar } from './components'
import { EditableVoidElement } from './custom-types'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LeftVert from "../../components/LeftVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// const EditableVoids = () => {
//   const [value, setValue] = useState<Descendant[]>(initialValue)
//   const editor = useMemo(
//     () => withEditableVoids(withHistory(withReact(createEditor()))),
//     []
//   )
//
//   return (
//     <Slate editor={editor} value={value} onChange={setValue}>
//       <Toolbar>
//         <InsertEditableVoidButton />
//       </Toolbar>
//
//       <Editable
//         renderElement={props => <Element {...props} />}
//         placeholder="Enter some text..."
//       />
//     </Slate>
//   )
// }

export const withEditableVoids = (editor:any) => {
  const { isVoid } = editor

  editor.isVoid = (element:any) => {
    return element.type === 'editable-void' ? true : isVoid(element)
  }

  return editor
}

export const insertEditableVoid = (editor:Editor) => {
  const text = { text: '' }
  const voidNode: EditableVoidElement = {
    type: 'editable-void',
    children: [text],
  }
  Transforms.insertNodes(editor, voidNode)
}

const Element = (props:any) => {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'editable-void':
      return <EditableVoid {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const unsetWidthStyle = css`
  width: unset;
`

const EditableVoid = ({ attributes, children, element }:any) => {
  const [inputValue, setInputValue] = useState('')
  const buttons = [{
        icon: <AddIcon/>,
        title: 'delicate',
    }]

  const options = [{
        icon: <DeleteIcon/>,
        title: 'delete',
    }]
    console.log(element)
  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <div {...attributes} contentEditable={false}>
      <LeftVert
                buttons={buttons}
                options={options}
                button={<MoreVertIcon/>}
           > <RichTextEditor initialValue={
              [
              {
              type: 'paragraph',
              children: [
              { text: 'This is editable text' },
              ],
              },
              ]
           }
      /> </LeftVert>

      {children}
    </div>
  )
}

const InsertEditableVoidButton = () => {
  const editor = useSlateStatic()
  return (
    <Button
      onMouseDown={(event:any) => {
        event.preventDefault()
        insertEditableVoid(editor)
      }}
    >
      <Icon>add</Icon>
    </Button>
  )
}

// const initialValue: any[] = [
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text:
//           'In addition to nodes that contain editable text, you can insert void nodes, which can also contain editable elements, inputs, or an entire other Slate editor.',
//       },
//     ],
//   },
//   {
//     type: 'editable-void',
//     children:  [
//               {
//               type: 'paragraph',
//               children: [
//               { text: 'This is editable text' },
//               ],
//               },
//               ],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: '',
//       },
//     ],
//   },
// ]

// export default EditableVoids
export {
  EditableVoid
}