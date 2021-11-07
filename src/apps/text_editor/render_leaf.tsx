import CollabeHoeer from "./components/collabe_user_hover";
import React from "react";

export const RenderLeaf = (props: any) => {


  var {attributes, children, leaf, MarKRenderLeaf, SearchLeaf} = props

  if (leaf.collaborate) {
    return <CollabeHoeer {...props} />
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underlined) {
    children = <u>{children}</u>
  }
  if (leaf.highlight) {
    return <SearchLeaf {...props} />
  } else {
    return <MarKRenderLeaf {...props} />;
  }
};