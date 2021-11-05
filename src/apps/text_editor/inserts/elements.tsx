import {Element as SlateElement, Transforms} from "slate";
import React from "react";
import {Divider, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {ReactEditor, useReadOnly, useSlateStatic} from "slate-react";
import {css} from "@emotion/css";
import {ImageElement} from "../Functions/paste-html";
import uniqid from "uniqid";
import {Refer} from "../components/refer";
import TableCellComponent from "../components/table_cell";


export const components_elements: any = {
    'refer': {
        'element': (props: any) => <Refer {...props} />,
        'insert': (character: any) => ([
            {
                type: 'refer',
                data: [],
                id: uniqid(),
                children: [{text: ''}],
            }]),
    },
    'divider': {
        'element': (props: any) => <Divider {...props} />,
        'insert': (character: any) => ([{
            type: character,
            id: uniqid(),
            children: [{text: ''}],
        }, {
            type: 'paragraph',
            id: uniqid(),
            children: [{text: ''}],
        }]),
    },
    'quote': {
        'element': (props: any) => <Typography style={{borderLeft: 'black solid 3px', paddingLeft: '10px'}} variant="h6"
                                               gutterBottom
                                               component="div" {...props.attributes}>{props.children}</Typography>,
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
    'list-item': {
        'element': (props: any) => <li {...props.attributes}>{props.children}</li>,
    },
    'ordered-list-item': {
        'element': (props: any) => <ol {...props.attributes}>{props.children}</ol>,
        'insert': (character: any) => ({
            type: 'ordered-list-item',
            id: uniqid(),
            children: [{
                type: 'list-item',
                children: [{text: ''}],
            }],
        }),
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
            <TableBody style={{border: '1px solid black'}} {...props.attributes}>{props.children}</TableBody>
        </Table>,
        'insert': (character: any) => {
            const id = uniqid()
            return {
            type: 'table',
            id: id,
            children: [
                {
                    type: 'table-row',
                    id:id+'-0',
                    children: [
                        {
                            type: 'table-cell',
                            id:id+'-00',
                            children: [{text: ''}],
                        },
                        {
                            id:id+'-01',
                            type: 'table-cell',
                            children: [{text: 'Human', bold: true}],
                        },
                        {
                            id:id+'-02',
                            type: 'table-cell',
                            children: [{text: 'Dog', bold: true}],
                        },
                        {
                            id:id+'-03',
                            type: 'table-cell',
                            children: [{text: 'Cat', bold: true}],
                        },
                    ],
                },
                {
                    type: 'table-row',
                    id:id+'-1',
                    children: [
                        {
                            id:id+'-10',
                            type: 'table-cell',
                            children: [{text: '# of Feet', bold: true}],
                        },
                        {
                            id:id+'-11',
                            type: 'table-cell',
                            children: [{text: '2'}],
                        },
                        {
                            id:id+'-12',
                            type: 'table-cell',
                            children: [{text: '4'}],
                        },
                        {
                            id:id+'-12',
                            type: 'table-cell',
                            children: [{text: '4'}],
                        },
                    ],
                },
                {
                    id:id+'-2',
                    type: 'table-row',
                    children: [
                        {
                            id:id+'-20',
                            type: 'table-cell',
                            children: [{text: '# of Lives', bold: true}],
                        },
                        {
                            id:id+'-21',
                            type: 'table-cell',
                            children: [{text: '1'}],
                        },
                        {
                            id:id+'-22',
                            type: 'table-cell',
                            children: [{text: '1'}],
                        },
                        {
                            id:id+'-23',
                            type: 'table-cell',
                            children: [{text: '9'}],
                        },
                    ],
                },
            ],
        }
        },
    },
    'table-row': {
        'element': (props: any) => <TableRow {...props.attributes}>{props.children}</TableRow>,
    },
    'table-cell': {
        'element': (props: any) => TableCellComponent(props),
    },
    'other': {
        'insert': (character: any) => ({
            type: character,
            id: uniqid(),
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


