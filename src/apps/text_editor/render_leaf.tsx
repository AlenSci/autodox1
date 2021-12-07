import React from "react";

export const RenderLeaf = (props: any) => {
    var {attributes, children} = props
    props.leafs.map((LEAF: any) => {
        children = <LEAF type={props.children.props.parent.type} {...props} >{children}</LEAF>
    })

    return <span
        style={{width: '100%'}}
        onDragOver={(e: any) => {
            e.target.style.borderBottom = 'solid lightblue 3px'
        }}
        onDragLeave={(e: any) => {
            e.target.style.borderBottom = null
        }}
        {...attributes} >{children}</span>
};