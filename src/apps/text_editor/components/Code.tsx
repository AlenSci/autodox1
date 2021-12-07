import React from 'react'

import {Tooltip} from "@mui/material";
import BasicSelect from "../../../components/selectCom";
import CodeEditor from "../../../components/CodeEditor";
import useUpdateNode from "../hooks/useUpdateNode";


function Code(props: any) {
    const [ref, update] = useUpdateNode(props)

    return <Tooltip
        ref={ref}
    arrow
    title={
      <BasicSelect
        value={props.element.language} onChange={(e:any) => {
        // setLanguage(e.target.value)
          update({language: e.target.value})

        }
      } label={'Select a language'} options={['javascript', 'css', 'xml', 'python', 'sql', 'java', 'php', 'c++']} />
    }
    placement="right"
    >
         <span contentEditable={false}  {...props.attributes}
    >

    <CodeEditor
                language={props.element.language}
                onChange={(value:string)=> {
                    // setCode(value)
                    update({codeValue: value})
                }}
                >
      {`${props.element.codeValue}`}
    </CodeEditor>
    {props.children}

    </span>
    </Tooltip>
}

export default Code;