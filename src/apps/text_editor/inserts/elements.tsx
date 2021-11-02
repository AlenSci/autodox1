import {Element as SlateElement, Transforms} from "slate";
import React from "react";
import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {ReactEditor, useReadOnly, useSlateStatic} from "slate-react";
import {css} from "@emotion/css";
import {ImageElement} from "../components/paste-html";




export const components_elements: any = {
    'divider': {
        'element': (props: any) => <Divider {...props} />,
        'insert': (character: any) => ([{
            type: character,
            children: [{text: ''}],
        }, {
            type: 'paragraph',
            children: [{text: ''}],
        }]),
    },
    'quote': {
        'element': (props: any) => <blockquote {...props.attributes}>{props.children}</blockquote>,
    },
    'code': {
        'element': (props: any) => <pre>
          <code {...props.attributes}>{props.children}</code>
        </pre>,
    },
    'bulleted-list': {
        'element': (props: any) => <ul {...props.attributes}>{props.children}</ul>,
    },
    'check-list-item': {
        'element': (props: any) => <CheckListItemElement {...props} />,
    },
    'heading-one': {
        'element': (props: any) => <h1 {...props.attributes}>{props.children}</h1>,
    },
    'numbered-list': {
        'element': (props: any) => <ol {...props.attributes}>{props.children}</ol>,
    },
    'link': {
        'element': (props: any) => <a href={props.element.url} {...props.attributes}>
            {props.children}
        </a>,
    },
    'image': {
        'element': (props: any) => <ImageElement {...props} />,
    },
    'table': {
        'element': (props: any) => <Table>
            <TableBody {...props.attributes}>{props.children}</TableBody>
        </Table>,
        'insert': (character: any) => ({
            type: 'table',
            children: [
                {
                    type: 'table-row',
                    children: [
                        {
                            type: 'table-cell',
                            children: [{text: ''}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: 'Human', bold: true}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: 'Dog', bold: true}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: 'Cat', bold: true}],
                        },
                    ],
                },
                {
                    type: 'table-row',
                    children: [
                        {
                            type: 'table-cell',
                            children: [{text: '# of Feet', bold: true}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: '2'}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: '4'}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: '4'}],
                        },
                    ],
                },
                {
                    type: 'table-row',
                    children: [
                        {
                            type: 'table-cell',
                            children: [{text: '# of Lives', bold: true}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: '1'}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: '1'}],
                        },
                        {
                            type: 'table-cell',
                            children: [{text: '9'}],
                        },
                    ],
                },
            ],
        }),
    },
    'table-row': {
        'element': (props: any) => <TableRow {...props.attributes}>{props.children}</TableRow>,
    },
    'table-cell': {
        'element': (props: any) =><TableCell {...props.attributes}>{props.children}</TableCell>,
    },
    'other': {
        'insert': (character: any) => ({
            type: character,
            children: [{text: ''}],
        }),
    },
};


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


export const insertElement = (editor: any, character: string) => {
    var fragment: any
    [components_elements].map((i: any) => {
        if (character in i && 'insert' in i[character]) {
            fragment = i[character].insert(character)
        } else {
            fragment = i.other.insert(character)
        }
    })
    Transforms.insertNodes(editor, fragment)
};


