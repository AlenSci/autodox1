import React, {useCallback, useMemo, useState} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {createEditor, Descendant, Element as SlateElement, Node, Transforms,} from 'slate'
import {withHistory} from 'slate-history'
import {ParagraphElement, TitleElement} from './custom-types'
import {EditableVoid, withEditableVoids} from "./components/editable-voids";
import {css} from "@emotion/css";
import uniqid from "uniqid";
import {TableComponent, withEditableTable} from "./components/table-component";

const withLayout = (editor: any) => {
    const {normalizeNode} = editor

    editor.normalizeNode = ([node, path]: any) => {
        if (path.length === 0) {
            if (editor.children.length < 1) {
                const title: TitleElement = {
                    type: 'title',
                    children: [{text: 'Untitled'}],
                }
                Transforms.insertNodes(editor, title, {at: path.concat(0)})
            }

            if (editor.children.length < 2) {
                const paragraph: ParagraphElement = {
                    type: 'paragraph',
                    children: [{text: ''}],
                }
                Transforms.insertNodes(editor, paragraph, {at: path.concat(1)})
            }

            // @ts-ignore
            for (const [child, childPath] of Node.children(editor, path)) {
                let type: string
                const slateIndex = childPath[0]
                const enforceType = (type: any) => {
                    if (SlateElement.isElement(child) && child.type !== type) {
                        const newProperties: Partial<SlateElement> = {type}
                        Transforms.setNodes<SlateElement>(editor, newProperties, {
                            at: childPath,
                        })
                    }
                }

                // @ts-ignore
                switch (slateIndex) {
                    case 0:
                        type = 'title'
                        enforceType(type)
                        break
                    // @ts-ignore
                    case 1:
                        type = 'paragraph'
                        enforceType(type)
                    // @ts-ignore
                    default:
                        break
                }
            }
        }

        return normalizeNode([node, path])
    }

    return editor
}

const ForcedLayout = () => {
    // localStorage.setItem('initialValue',JSON.stringify(initialValue))

    var initial: any = localStorage.getItem('initialValue')
    initial = initial && JSON.parse(initial)
    // console.log({initial})
    const [value, setValue] = useState<Descendant[]>(initial)
    // @ts-ignore
    const renderElement: any = useCallback((props: any) => <Element {...props} />, [])

    const withs: any = [
        withEditableVoids,
        withEditableTable,
        withLayout,
        withHistory,
        withReact,
    ];

    var WITHS: any = createEditor()
    withs.map((i: any) => {
        WITHS = i(WITHS)
    });
    const editor = useMemo(() => WITHS, []);


    return (
        <Slate
            editor={editor} value={value} onChange={value => {
            setValue(value)
            localStorage.setItem('initialValue', JSON.stringify(value))
        }}>
            <Editable


                className={css`padding-left: 96px; padding-right: 96px;`}
                renderElement={renderElement}
                placeholder="Enter a title…"
                spellCheck
                autoFocus
            />
        </Slate>
    )
}

const Element = (props: any) => {
    const {attributes, children, element} = props
    switch (element.type) {
        case 'editable-void':
            return <EditableVoid {...props} />
        case 'data-grid':
            return <TableComponent {...props} />
        case 'title':
            return <h2 style={{color: 'blue'}} {...attributes}>{children}</h2>
        default:
            return <p {...attributes}>{children}</p>
    }
}

const initialValue: any[] = [
    {
        id: '111',
        type: 'title',
        children: [{text: 'title sample is here.'}],
    },
    {
        id: '1112',
        type: 'paragraph',
        children: [{text: ''}],
    },
    {
        id: '222x',
        type: 'data-grid',
        children: [{text: ''}],
    },
    {
        id: '2221',
        type: 'editable-void',
        children: [{
            id: '2221x',
            type: 'paragraph',
            children: [
                {text: 'This is editable text'},
            ],
        },],
    },
    {
        id: '333',
        type: 'editable-void',
        children: [{
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
        },
        ],
    },
]

export default ForcedLayout
