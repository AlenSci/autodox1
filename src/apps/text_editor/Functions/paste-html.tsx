import React from 'react'
import {jsx} from 'slate-hyperscript'
import {Descendant, Transforms} from 'slate'
import {css} from '@emotion/css'
import {useFocused, useSelected,} from 'slate-react'

const ELEMENT_TAGS :any = {
  A: (el:any) => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: (el:any) => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS:any = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
}

const deserialize: any = (el: any) => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  } else if (el.nodeName === 'BR') {
    return '\n'
  }

  const {nodeName} = el
  let parent = el

  if (
      nodeName === 'PRE' &&
      el.childNodes[0] &&
      el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }
  let children = Array.from(parent.childNodes)
      .map(deserialize)
      .flat()


  if (children.length === 0) {
      children = [{text: ''}]
    }


  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el)
    return jsx('element', attrs, children)
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el)
    return children.map(child => jsx('text', attrs, child))
  }

  return children
};


export const withHtml = (editor:any) => {
  const { insertData, isInline, isVoid } = editor
  editor.isInline = (element:any) => {
    return element.type === 'link' ? true : isInline(element)
  }
  editor.isInline = (element:any) => {
    return element.code ? true : isInline(element)
  }

  editor.isVoid = (element:any) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = (data:any) => {
    const html = data.getData('text/html')

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html')
      const fragment = deserialize(parsed.body)
      try {
        Transforms.insertFragment(editor, fragment)
      } catch (exception_var) {
        console.error(exception_var)
      }



      return
    }

    insertData(data)
  }

  return editor
}

export const ImageElement = ({ attributes, children, element }:any) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <img
        src={element.url}
        className={css`
          display: block;
          max-width: 100%;
          max-height: 20em;
          box-shadow: ${selected && focused ? '0 0 0 2px blue;' : 'none'};
        `}
      />
    </div>
  )
}

// const Leaf = ({ attributes, children, leaf }:any) => {
//   if (leaf.bold) {
//     children = <strong>{children}</strong>
//   }
//
//   if (leaf.code) {
//     children = <code>{children}</code>
//   }
//
//   if (leaf.italic) {
//     children = <em>{children}</em>
//   }
//
//   if (leaf.underline) {
//     children = <u>{children}</u>
//   }
//
//   if (leaf.strikethrough) {
//     children = <del>{children}</del>
//   }
//
//   return <span {...attributes}>{children}</span>
// }
//

export {deserialize}