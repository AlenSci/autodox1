import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/python/python'

import {Controlled} from 'react-codemirror2'

function CodeEditor({onChange, language, value}: any) {

    const changeValueHandler = (editor: any, data: any, v: any) => {
        editor.setSize('100%', '100%')
        onChange(v)
    }

    return (
        <Controlled
            value={value}
            options={{
                mode: language,
                theme: 'material',
                lineWrapping: true,
                lineNumbers: true,
            }}
            onBeforeChange={changeValueHandler}
        />
    )
}

export default CodeEditor
