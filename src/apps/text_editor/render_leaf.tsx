import React from "react";

export const RenderLeaf = (props: any) => {

  var {attributes, children, leaf} = props

  props.leafs.map((LEAF: any) => {
    children = <LEAF {...props} >{children}</LEAF>
  })


  return <span {...attributes} >{children}</span>
};