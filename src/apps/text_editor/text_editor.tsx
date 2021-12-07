import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {Editable, Slate, withReact,} from 'slate-react'
import {createEditor, Descendant, Editor, Element as SlateElement, Point, Range, Transforms} from 'slate'
import {withHistory} from 'slate-history'
import {withMyPlugin} from "./plugins/other";
import {withHtml} from "./Functions/paste-html";
import Render_element from './render_element'
import {HoveringToolbar, toggleFormat} from "./Functions/hovering-toolbar";
import useMention from "./hooks/use_mentions";
import {CHARACTERS, insertMention, withMentions} from "./inserts/mentoin_element";
import {components_elements, insertElement} from "./inserts/elements";
import useSearch from "./hooks/use_search";
import {css} from "@emotion/css";
import useMarkDown from "./Functions/markdown-preview";
import {withShortcuts} from "./Functions/markdown-shortcuts";
import COLLAPORATOIN, {COLLAPORATOIN_SUB} from "../../queries/text_editor";
import MutationHook from "../../hooks/mutation_hook";

import SubscriptionHook from "../../hooks/subscription_hook";

import {RenderLeaf} from "./render_leaf";
import decorate from "./decorate";
import CollabeHoeer from "./components/collabe_user_hover";


import CodeHighLightLeaf from "./leafs/CodeHighLightLeaf";
// import initialValue from "./components/initialValue";
// localStorage.setItem('value', JSON.stringify(initialValue))

const RichTextEditor = (props:any) => {
    const id = props.id

    var init: any = localStorage.getItem('value')
    init = JSON.parse(init || '[]')
    const [value, setValue]: any = useState<Descendant[]>(init)
    const renderElement = useCallback(props => <Render_element {...props} />, [])
    const withs: any = [
        withShortcuts,
        withMentions,
        withHtml,
        withChecklists,
        withHistory,
        withReact,
        withMyPlugin
    ];

    var WITHS: any = createEditor()
    withs.map((i: any) => {
        WITHS = i(WITHS)
    });
    const editor = useMemo(() => WITHS, []);
    const [SUB_load, SUB_data]: any = SubscriptionHook(COLLAPORATOIN_SUB, {id: 0});
    const [exec, load, data] = MutationHook(COLLAPORATOIN)
    useEffect(() => {
        Editor.withoutNormalizing(editor, () => {
            const parsed_data = SUB_data.collaborate && JSON.parse(SUB_data.collaborate.message)
            if (parsed_data && parsed_data.editorId === id) {
                Transforms.select(editor, parsed_data.selection)
                parsed_data.operations.forEach((op: any) => {
                    editor.apply(op);
                })

                Transforms.setNodes(
                    editor,
                    {
                        collaborate: true,
                        sender: SUB_data.collaborate.sender
                    }, {
                        at: parsed_data.selection.anchor.path
                    }
                );
                setTimeout(() => {
                    Transforms.setNodes(
                        editor,
                        {
                            collaborate: false
                        },
                        {
                            at: parsed_data.selection.anchor.path
                        }
                    );
                }, 1000)


            }
        });


    }, [SUB_data]);


    const [onChange, onKeyDown, Menu]: any = useMention(editor, /^@(\w+)$/, CHARACTERS, insertMention)
    const [onChange_E, onKeyDown_E, Menu_E]: any = useMention(editor, /^\/(\w+)$/, Object.keys(components_elements), insertElement)
    const [search, setSearch] = useState<string | undefined>()
    const [SearchDecorate, SearchLeaf]: any = useSearch(search);
    const [MarkDecorate, MarKRenderLeaf] = useMarkDown()



    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(value: any) => {
                setValue(value)
                !SUB_data && exec({
                    properties: JSON.stringify({
                        selection: editor.selection,
                        operations: editor.operations,
                        editorId: id
                    })
                });
                localStorage.setItem('value', JSON.stringify(value))
                onChange()
                onChange_E()
            }}>

            <HoveringToolbar/>
            <Menu_E/>
            <input
                type="search"
                placeholder="Search the text..."
                onChange={e => setSearch(e.target.value)}
                className={css`
              padding-left: 2.5em;
              width: 100%;
            `}
            />

            <Menu/>
            <Editable
                style={{marginLeft:'10%', marginRight:'10%'}}
                decorate={(props) => decorate(props, [SearchDecorate, MarkDecorate])}
                onKeyDown={(e: any) => {
                    onKeyDown(e)
                    onKeyDown_E(e)
                }}

                renderLeaf={props => <RenderLeaf leafs={[SearchLeaf, MarKRenderLeaf, CollabeHoeer, CodeHighLightLeaf]} {...props} />}
                onDOMBeforeInput={(event: InputEvent) => {
                    // event.preventDefault()
                    switch (event.inputType) {
                        case 'formatBold':
                            return toggleFormat(editor, 'bold')
                        case 'formatItalic':
                            return toggleFormat(editor, 'italic')
                        case 'formatUnderline':
                            return toggleFormat(editor, 'underlined')
                    }
                }}
                renderElement={renderElement}
                placeholder="Enter some text here. Or hit / and select element..."
                spellCheck
                autoFocus
            />
        </Slate>
    );
};

const withChecklists = (editor:any) => {
  const { deleteBackward } = editor

  editor.deleteBackward = (...args:any) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [match]:any = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'check-list-item',
      })

      if (match) {
        const [, path] = match
        const start = Editor.start(editor, path)

        if (Point.equals(selection.anchor, start)) {
          const newProperties: Partial<SlateElement> = {
            type: 'paragraph',
          }
          Transforms.setNodes(editor, newProperties, {
            match: n =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === 'check-list-item',
          })
          return
        }
      }
    }

    deleteBackward(...args)
  }

  return editor
}


export default RichTextEditor
