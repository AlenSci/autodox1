import React, {useMemo, useState} from 'react'
import {Editable, Slate, useSlate, withReact} from 'slate-react'
import {createEditor, Descendant, Editor, Text, Transforms,} from 'slate'
import {withHistory} from 'slate-history'

import {Button, Icon} from '../components'
import {CustomEditor} from '../custom-types'
import {HoveringToolbar} from "./hovering-toolbar";

const TableCell = (props:any) => {
    const [value, setValue] = useState<Descendant[]>(props.initialValue)
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <Slate editor={editor} value={value} onChange={value => {
            props.onChange(value)
            setValue(value)

        }}>
            <HoveringToolbar/>
            <Editable
                renderLeaf={props => <Leaf {...props} />}
                placeholder="Enter some text..."
                onDOMBeforeInput={(event: InputEvent) => {
                    event.preventDefault()
                    switch (event.inputType) {
                        case 'formatBold':
                            return toggleFormat(editor, 'bold')
                        case 'formatItalic':
                            return toggleFormat(editor, 'italic')
                        case 'formatUnderline':
                            return toggleFormat(editor, 'underlined')
                    }
                }}
            />
        </Slate>
    )
}

const toggleFormat = (editor: CustomEditor, format: string) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}

const isFormatActive = (editor: CustomEditor, format: string) => {
  // @ts-ignore

    const [match] = Editor.nodes(editor, {
        // @ts-ignore
    match: n => n[format] === true,
    mode: 'all',
  })
  return !!match
}

// @ts-ignore
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underlined) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}


// @ts-ignore
const FormatButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        toggleFormat(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}


export default TableCell
