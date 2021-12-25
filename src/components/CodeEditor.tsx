import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/python/python'

import { Controlled } from 'react-codemirror2'

function CodeEditor({ onChange, language, children }:any) {
  function changeValueHandler(editor:any, data:any, value:any) {
    onChange(value)
  }

  return (
    <Controlled
        value={children}
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
