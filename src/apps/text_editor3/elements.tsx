import {useSlate} from "slate-react";
import React, {useState} from "react";
import {Transforms} from "slate";
import CheckListItemElement from "./Components/check_listItem";
import getNode from "./Functions/get_node_by_html";
import CodeBlock from "./Components/code_block";
import RenderCellGrid from "./Components/data_grid";


const Element = (props: JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => {
    const editor: any = useSlate()

    const [state, setState]: any = useState('0')
    const [draggable, setD]: any = useState(false)
    const [dragging, setDragging]: any = useState(false)
    const {attributes, children, element} = props

    var elements: any = {
        "check-list-item": <CheckListItemElement {...props} />,
        'code': <CodeBlock {...props}/>,
        'data-grid': <RenderCellGrid {...props}/>
    }
    const render = elements[element.type] || <p {...attributes}>{children}</p>
    return <div
        id={element.id}
        onDrop={(e: any) => {
            const id = e.dataTransfer.getData("dragged")
            var dragged: any = document.getElementById(id)
            var draggedOver: any = document.getElementById(element.id)
            const [node, path]: any = getNode(dragged.children[dragged.children.length - 1], editor)
            const [node2, path2]: any = getNode(draggedOver.children[draggedOver.children.length - 1], editor)

            Transforms.moveNodes(editor, {
                at: path,
                to: path2,
            })
            draggedOver.style.borderTop = null
            draggedOver.style.borderBottom = null
            draggedOver.style.background = null
        }}

        onDragStart={(e: any) => {
            setDragging(true)
            e.dataTransfer.setData("dragged", e.target.id)
        }}
        onDragEnd={(e: any) => {
            setDragging(false)
            e.target.style.borderTop = null
            e.target.style.borderBottom = null

        }}
        onDragOver={(e: any) => {
            e.preventDefault()
            var draggedOver: any = document.getElementById(element.id)
            draggedOver.style.borderBottom = '3px solid lightblue'
            draggedOver.style.background = null
            // if (e.clientY <= 336) {
            //     // draggedOver.style.borderTop = '3px solid lightblue'
            //     draggedOver.style.borderBottom = null
            //     draggedOver.style.background = null
            // }
            //
            // if (e.clientY > 326 && e.clientY < 336) {
            //     draggedOver.style.borderTop = null
            //     draggedOver.style.borderBottom = null
            //     draggedOver.style.background = 'lightblue'
            //
            // }
        }}
        onDragLeave={(e: any) => {
            var draggedOver: any = document.getElementById(element.id)
            draggedOver.style.borderTop = null
            draggedOver.style.borderBottom = null
            draggedOver.style.background = null
        }}
        draggable={draggable} onMouseLeave={() => setState('0')} onMouseEnter={() => setState('70')}
        style={{width: '100%', opacity: dragging ? '0.4' : '1'}}>
        <button contentEditable={false}
                onMouseEnter={(e: any) => {
                    e.target.style.background = 'lightgray'
                }}
                onMouseLeave={(e: any) => {
                    e.target.style.background = 'None'
                }}
                style={{
                    verticalAlign: 'top',
                    textAlign: 'left',
                    position: 'absolute',
                    left: '50px',
                    opacity: state,
                    outline: '0',
                    border: '0',
                    height: 'inherit',
                    background: 'None'
                }}>+
        </button>
        <button
            onMouseEnter={(e: any) => {
                e.target.style.background = 'lightgray'
                setD(true)
            }}
            onMouseLeave={(e: any) => {
                e.target.style.background = 'None'
                setD(false)
            }}
            contentEditable={false} style={{
            verticalAlign: 'top',
            textAlign: 'left',
            position: 'absolute',
            left: '70px',
            opacity: state,
            height: 'inherit',
            outline: '0',
            border: '0',
            background: 'None'
        }}
        >
            ⠿
        </button>
        {render}</div>
}

export default Element