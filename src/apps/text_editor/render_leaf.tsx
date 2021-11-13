import React from "react";
import LeftVert from "../../components/LeftVert";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Route} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const RenderLeaf = (props: any) => {
    var {attributes, children} = props

    props.leafs.map((LEAF: any) => {
        children = <LEAF {...props} >{children}</LEAF>
    })
    const options = [{
        icon: <DeleteIcon/>,
        title: 'delete',
    }]

    const buttons = [{
        icon: <AddIcon/>,
        title: 'delicate',
    }]


    // return <LsftVert
    //     buttons={buttons}
    //     options={options}
    //     button={<MoreVertIcon/>}
    // > <span
    //     style={{width: '100%'}}
    //     onDragOver={(e: any) => {
    //         e.target.style.borderBottom = 'solid lightblue 3px'
    //     }}
    //     onDragLeave={(e: any) => {
    //         e.target.style.borderBottom = null
    //     }}
    //     {...attributes} >{children}</span> </LsftVert>

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