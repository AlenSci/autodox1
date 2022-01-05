import React, {useCallback, useMemo, useState} from 'react'
import isHotkey from 'is-hotkey'
import {Editable, Slate, withReact} from 'slate-react'
import {createEditor, Descendant, Editor, Transforms,} from 'slate'
import {withHistory} from 'slate-history'
import {CustomEditor} from './custom-types'
import {HoveringToolbar} from './components/hovering-toolbar'
import useMention from "./mention_plugin/use_mentions";
import {CHARACTERS, insertMention, Mention, withMentions} from "./mention_plugin/mentoin_element";
import {components_elements} from "./make_element_plugin/elements";

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

// const LIST_TYPES = ['numbered-list', 'bulleted-list']

const RichText = (props: any) => {

    const [value, setValue] = useState<Descendant[]>(props.initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const withs: any = [
        withReact,
        withHistory,
        withMentions
    ];

    var WITHS: any = createEditor()
    withs.map((i: any) => {
        WITHS = i(WITHS)
    });
    const editor = useMemo(() => WITHS, []);
    const selection = editor.selection
    console.log(selection && selection.anchor.path)
    console.log(selection && selection.anchor.offset)

    const [onChange, onKeyDown, Menu]: any = useMention(editor, /^@(\w+)$/, CHARACTERS, insertMention)
    const insertElement = (editor: any, character: string) => {
        console.log('insertElement')


        var voidNode: any = {
            type: 'editable-void',
            children: [components_elements[character]['insert'](character)],
        }
        // console.log({character:character})
        // if (character === 'data-grid') {
        //     voidNode = {
        //         id: 'ddd',
        //         type: 'data-grid',
        //         children: [{text: ''}],
        //     }
        //
        // }
        props.path[0] += 1
        Transforms.insertNodes(props.main_editor, voidNode, {at: props.path})
    };

    const [onChange_E, onKeyDown_E, Menu_E]: any = useMention(editor, /^\/(\w+)$/, Object.keys(components_elements), insertElement)

    return (
        <Slate
            editor={editor} value={value} onChange={value => {
            onChange()
            onChange_E()
            setValue(value)
        }}>
            <HoveringToolbar/>
            <Menu_E/>
            <Menu/>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onKeyDown={event => {
                    onKeyDown(event)
                    onKeyDown_E(event)

                    //TODO
                    // and not / and not @
                    // if (event.key === 'Enter') {
                    //     event.preventDefault()
                    //     const voids: any = true
                    //     const at = editor.selection
                    //
                    //     Transforms.splitNodes(editor, {at: editor.selection})
                    //
                    //     var selected: any
                    //     if (selection !== null && selection.anchor !== null) {
                    //         var path = selection.anchor.path[0]
                    //         path += 1
                    //         selected = editor.children[path];
                    //         Transforms.removeNodes(editor, {at: editor.selection})
                    //     }
                    //     var voidNode: any = [{
                    //         id: '222',
                    //         type: 'editable-void',
                    //         children: selected.children,
                    //     }]
                    //
                    //     props.path[0] += 1
                    //     Transforms.insertNodes(props.main_editor, voidNode, {at: props.path})
                    // }

                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            // @ts-ignore
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}


const toggleMark = (editor: CustomEditor, format: string) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}


const isMarkActive = (editor: CustomEditor, format: string) => {
    const marks = Editor.marks(editor)
    // @ts-ignore
    return marks ? marks[format] === true : false
}

// @ts-ignore
const Element = (props: any) => {
    console.log('Element')
    const {attributes, children, element} = props
    var elements: any = {
        'mention': <Mention {...props} />,
        'block-quote': <blockquote {...attributes}>{children}</blockquote>,
        'bulleted-list': <ul {...attributes}>{children}</ul>,
        'heading-one': <h1 {...attributes}>{children}</h1>,
        'list-item': <li {...attributes}>{children}</li>,
        'numbered-list': <ol {...attributes}>{children}</ol>,
    }
    var fragment: any = components_elements[element.type]
    const render = fragment && fragment['element'](props) || elements[element.type] || <p {...attributes}>{children}</p>
    return render
}

// @ts-ignore
const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}


export default RichText
