import React from "react";

const Leaf = ({attributes, children, leaf, element}: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }
    if (leaf.underlined) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}
export default Leaf