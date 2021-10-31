import {ImageElement} from "./paste-html";
import React from "react";
import {ReactEditor, useReadOnly, useSlateStatic} from "slate-react";
import {css} from "@emotion/css";
import {Element as SlateElement, Transforms} from "slate";

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

const Element = (props: any) => {
    const {attributes, children, element} = props
    const x = {
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
