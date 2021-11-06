import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Editable, ReactEditor, Slate, withReact,} from 'slate-react'
import {createEditor, Descendant, Editor, Element as SlateElement, Point, Range, Text, Transforms,} from 'slate'
import {withHistory} from 'slate-history'
import {withMyPlugin} from "./plugins/other";
import {withHtml} from "./Functions/paste-html";
import Element from './components/element'
import {HoveringToolbar, Leaf, toggleFormat} from "./Functions/hovering-toolbar";
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
import initialValue from "./components/initialValue";
localStorage.setItem('value', JSON.stringify(initialValue))

const CheckListsExample = () => {

    var init: any = localStorage.getItem('value')
    init = JSON.parse(init || '[]')
    const [value, setValue]: any = useState<Descendant[]>(init)
    const renderElement = useCallback(props => <Element {...props} />, [])
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
    const [SUB_load, SUB_data] = SubscriptionHook(COLLAPORATOIN_SUB, {id: 0});
    const [exec, load, data] = MutationHook(COLLAPORATOIN)
    const {apply} = editor;
    const parsed_data = useMemo(()=>{
        return SUB_data.collaborate&& JSON.parse(SUB_data.collaborate.message)
    },[SUB_data.collaborate])

    useEffect(() => {
        if (parsed_data) {
            editor.apply(parsed_data)
            console.log(parsed_data)
            Transforms.setNodes(
                editor,
                {
                    parsed_data: parsed_data,
                    collaborate: true, sender: SUB_data.collaborate.sender
                },
                {
                    at: parsed_data.path
                }
            );
            setTimeout(() => {
                Transforms.setNodes(
                    editor,
                    {
                        collaborate: false
                    },
                    {
                        at: parsed_data.path
                    }
                );
            }, 1000)
        }
    }, [parsed_data]);

    const [onChange, onKeyDown, Menu]: any = useMention(editor, /^@(\w+)$/, CHARACTERS, insertMention)
    const [onChange_E, onKeyDown_E, Menu_E]: any = useMention(editor, /^\/(\w+)$/, Object.keys(components_elements), insertElement)
    const [search, setSearch] = useState<string | undefined>()
    const [SearchDecorate, SearchLeaf]: any = useSearch(search);
    const [MarkDecorate, MarKRenderLeaf] = useMarkDown()

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={value => {
                setValue(value)
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
                decorate={([node, path]) => {
                    var ranges: any = []
                    SearchDecorate([node, path, ranges])
                    MarkDecorate([node, path, ranges])
                    return ranges
                }}
                onKeyDown={(e: any) => {
                    onKeyDown(e)
                    onKeyDown_E(e)
                    editor.apply = (operation: any) => {
                        exec({properties: JSON.stringify(operation)})
                        return apply(operation)
                    };

                }}


                renderLeaf={props => <Leaf style={{color:'red'}} SearchLeaf={SearchLeaf} MarKRenderLeaf={MarKRenderLeaf} {...props} />}
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
                placeholder="Get to work…"
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


export default CheckListsExample
