
import {ReactEditor, useReadOnly, useSlateStatic} from "slate-react";
import {css} from "@emotion/css";
import {Element as SlateElement, Transforms} from "slate";
import React from "react";

// @ts-ignore
const CheckListItemElement = ({attributes, children, element}) => {
    const editor = useSlateStatic()
    const readOnly = useReadOnly()
    const {checked} = element
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
                Transforms.setNodes(editor, newProperties, {at: path})
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
export default CheckListItemElement