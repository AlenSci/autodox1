import React, {useCallback, useMemo, useState} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {createEditor, Descendant,} from 'slate'
import {css} from '@emotion/css'
import {withHistory} from 'slate-history'
import {HoveringToolbar} from "../text_editor2/components/hovering-toolbar";
import {withChecklists} from "./Plugins/CheckLists";
import Element from './elements'
import {initialValue} from "./intialvalue";
import Leaf from "./leafs";


const Autodox = () => {
    const [value, setValue] = useState<Descendant[]>(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    const withs: any = [
        withChecklists,
        withHistory,
        withReact,
    ];

    var WITHS: any = createEditor()
    withs.map((i: any) => {
        WITHS = i(WITHS)
    });
    const editor = useMemo(() => WITHS, []);
    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <HoveringToolbar/>
            <Editable
                renderLeaf={renderLeaf}
                className={css`padding-left: 96px; padding-right: 96px;`}
                renderElement={renderElement}
                placeholder="Get to work…"
                spellCheck
                autoFocus
            />
        </Slate>
    )
}


export default Autodox
