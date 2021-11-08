import React, { useState, useMemo } from 'react'
import isUrl from 'is-url'
import { isKeyHotkey } from 'is-hotkey'
import { css } from 'emotion'
import { Editable, withReact, useSlate, useSelected } from 'slate-react'
import * as SlateReact from 'slate-react'
import {
  Transforms,
  Editor,
  Range,
  createEditor,
  Element as SlateElement,
  Descendant,
} from 'slate'
import { withHistory } from 'slate-history'
import { LinkElement, ButtonElement } from './custom-types'

import { Button, Icon, Toolbar } from '../components'

const InlinesExample = () => {
  // const [value, setValue] = useState<Descendant[]>(initialValue)
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  )

  // const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
  //   const { selection } = editor
  //
  //   // Default left/right behavior is unit:'character'.
  //   // This fails to distinguish between two cursor positions, such as
  //   // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
  //   // Here we modify the behavior to unit:'offset'.
  //   // This lets the user step into and out of the inline without stepping over characters.
  //   // You may wish to customize this further to only use unit:'offset' in specific cases.
  //   if (selection && Range.isCollapsed(selection)) {
  //     const { nativeEvent } = event
  //     if (isKeyHotkey('left', nativeEvent)) {
  //       event.preventDefault()
  //       Transforms.move(editor, { unit: 'offset', reverse: true })
  //       return
  //     }
  //     if (isKeyHotkey('right', nativeEvent)) {
  //       event.preventDefault()
  //       Transforms.move(editor, { unit: 'offset' })
  //       return
  //     }
  //   }
  // }

  // <Toolbar>
  //       <AddLinkButton />
  //       <RemoveLinkButton />
  //       <ToggleEditableButtonButton />
  //     </Toolbar>
  //     <Editable
  //       renderElement={props => <Element {...props} />}
  //       placeholder="Enter some text..."
  //       onKeyDown={onKeyDown}
  //     />
}

const withInlines = (editor:any) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element =>
    ['link', 'button'].includes(element.type) || isInline(element)

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const insertButton = editor => {
  if (editor.selection) {
    wrapButton(editor)
  }
}

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}

const isButtonActive = editor => {
  const [button] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
  })
  return !!button
}

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}

const unwrapButton = editor => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
  })
}

const wrapLink = (editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const wrapButton = editor => {
  if (isButtonActive(editor)) {
    unwrapButton(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const button: ButtonElement = {
    type: 'button',
    children: isCollapsed ? [{ text: 'Edit me!' }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, button)
  } else {
    Transforms.wrapNodes(editor, button, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className={css`
      font-size: 0;
    `}
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

const LinkComponent = ({ attributes, children, element }) => {
  const selected = useSelected()
  return (
    <a
      {...attributes}
      href={element.url}
      className={
        selected
          ? css`
              box-shadow: 0 0 0 3px #ddd;
            `
          : ''
      }
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}

const EditableButtonComponent = ({ attributes, children }) => {
  return (
    /*
      Note that this is not a true button, but a span with button-like CSS.
      True buttons are display:inline-block, but Chrome and Safari
      have a bad bug with display:inline-block inside contenteditable:
      - https://bugs.webkit.org/show_bug.cgi?id=105898
      - https://bugs.chromium.org/p/chromium/issues/detail?id=1088403
      Worse, one cannot override the display property: https://github.com/w3c/csswg-drafts/issues/3226
      The only current workaround is to emulate the appearance of a display:inline button using CSS.
    */
    <span
      {...attributes}
      onClick={ev => ev.preventDefault()}
      // Margin is necessary to clearly show the cursor adjacent to the button
      className={css`
        margin: 0 0.1em;
        background-color: #efefef;
        padding: 2px 6px;
        border: 1px solid #767676;
        border-radius: 2px;
        font-size: 0.9em;
      `}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </span>
  )
}

const Element = props => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'link':
      return <LinkComponent {...props} />
    case 'button':
      return <EditableButtonComponent {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const AddLinkButton = () => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      <Icon>link</Icon>
    </Button>
  )
}

const RemoveLinkButton = () => {
  const editor = useSlate()

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        if (isLinkActive(editor)) {
          unwrapLink(editor)
        }
      }}
    >
      <Icon>link_off</Icon>
    </Button>
  )
}

// const ToggleEditableButtonButton = () => {
//   const editor = useSlate()
//   return (
//     <Button
//       active
//       onMouseDown={event => {
//         event.preventDefault()
//         if (isButtonActive(editor)) {
//           unwrapButton(editor)
//         } else {
//           insertButton(editor)
//         }
//       }}
//     >
//       <Icon>smart_button</Icon>
//     </Button>
//   )
// }

export default InlinesExample
