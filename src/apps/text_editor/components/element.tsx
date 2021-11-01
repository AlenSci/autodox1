import {ImageElement} from "./paste-html";
import React from "react";
import {ReactEditor, useFocused, useReadOnly, useSelected, useSlateStatic} from "slate-react";
import {css} from "@emotion/css";
import {Element as SlateElement, Transforms} from "slate";
import {Divider} from "@mui/material";

const CheckListItemElement = ({ attributes, children, element }:any) => {
  const editor = useSlateStatic()
  const readOnly = useReadOnly()
  const { checked } = element
  return (
    <div
      {...attributes}
      className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        & + & {
          margin-top: 0;
        }
      `}
    >
      <span
        contentEditable={false}
        className={css`
          margin-right: 0.75em;
        `}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={event => {
            const path = ReactEditor.findPath(editor, element)
            const newProperties: Partial<SlateElement> = {
              checked: event.target.checked,
            }
            Transforms.setNodes(editor, newProperties, { at: path })
          }}
        />
      </span>
      <span
        contentEditable={!readOnly}
        suppressContentEditableWarning
        className={css`
          flex: 1;
          opacity: ${checked ? 0.666 : 1};
          text-decoration: ${!checked ? 'none' : 'line-through'};
          &:focus {
            outline: none;
          }
        `}
      >
        {children}
      </span>
    </div>
  )
}




const Mention = ({ attributes, children, element }:any) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(' ', '-')}`}
      style={{
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      @{element.character}
      {children}
    </span>
  )
}
const Element = (props: any) => {
    const {attributes, children, element} = props
    const x = {
        'divider':<Divider  {...attributes}> {children} </Divider>,
        'mention': <Mention {...props} />,
        quote: <blockquote {...attributes}>{children}</blockquote>,
        code: <pre>
          <code {...attributes}>{children}</code>
        </pre>,
        'bulleted-list': <ul {...attributes}>{children}</ul>,
        'check-list-item': <CheckListItemElement {...props} />,
        'heading-one':<h1 {...attributes}>{children}</h1>,
        'numbered-list':<ol {...attributes}>{children}</ol>,
        'link':<a href={element.url} {...attributes}>
                    {children}
                </a>,
        'image':<ImageElement {...props} />,
    };

    const y: any = element.type
    // @ts-ignore
    return x[y] || <p {...attributes}>{children}</p>

};
export default Element;
