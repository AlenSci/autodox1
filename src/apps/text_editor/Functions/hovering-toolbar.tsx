import React, {useEffect, useRef} from 'react'
import {ReactEditor, useSlate} from 'slate-react'
import {Editor, Range, Text, Transforms,} from 'slate'
import {css} from '@emotion/css'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import {Button, Icon, Menu, Portal} from '../components/components'
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

export const toggleFormat = (editor:any, format:any) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}

const isFormatActive = (editor:any, format:any) => {
  const [match]:any = Editor.nodes(editor, {
    match: (n:any) => n[format] === true,
    mode: 'all',
  })
  return !!match
}

export const Leaf = (props:any) => {
  var {attributes, children, leaf, MarKRenderLeaf, SearchLeaf}  = props

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underlined) {
    children = <u>{children}</u>
  }
  if (leaf.highlight) {
    return <SearchLeaf {...props} />
  } else {
    return <MarKRenderLeaf {...props} />;
  }
};

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>()
  const editor = useSlate()

  useEffect(() => {
    const el = ref.current
    const {selection} = editor

    if (!el) {
      return
    }

    if (
        !selection ||
        !ReactEditor.isFocused(editor) ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection: any = window.getSelection()
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    const position =
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    el.style.left = `${position < 0 ? 0 : position}px`


  });

  return (
      <Portal>
        <Menu
            // @ts-ignore
            ref={ref}
            className={css`
            padding: 8px 7px 6px;
            position: absolute;
            z-index: 1;
            top: -10000px;
            left: -10000px;
            background-color: #fff;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(4px);
        `}

        >
          <FormatButton format="bold" icon={<FormatBoldIcon/>}/>
          <FormatButton format="italic" icon={<FormatItalicIcon/>}/>
          <FormatButton format="underlined" icon={<FormatUnderlinedIcon/>}/>
        </Menu>
      </Portal>
  );
}

const FormatButton = ({ format, icon }:any) => {
  const editor = useSlate()
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event:any) => {
        event.preventDefault()
        toggleFormat(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}
