import React, {useRef} from "react";
import {mentoin_element} from "./inserts/mentoin_element";
import {components_elements} from "./inserts/elements";
import {Tooltip} from "@mui/material";
import PopVert from '../../components/PopVert';
import DeleteIcon from "@mui/icons-material/Delete";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import useGetNode from "./hooks/useGetNode";
import LeftVert from "../../components/LeftVert";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Route} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Render_element = (props: any) => {
    const [ref, target] = useGetNode()
    const {attributes, children, element} = props
    const x :any = {};
    [mentoin_element, components_elements].map((i: any) => {
        Object.keys(i).map((key: any) => {
            if ('element' in i[key]) {
                // @ts-ignore
                x[key] = i[key].element(props)
            }
        });
    })
    const y: any = element.type
    const editor: any = useSlate()


    const handleClick = (e: any) => {
        // const x = FindMatch(editor, (n: any) => n.id === row_id, false)
        // console.log(props.element);
        var path = ReactEditor.findPath(editor, target())
        Transforms.delete(editor, {
            at: path,
        });
    };
    const options = [{
        onClick: handleClick,
        icon: <DeleteIcon/>,
        title: 'delete',
    }]
     const buttons = [{
        icon: <AddIcon/>,
        title: 'delicate',
    }]
    //
    return <Tooltip
        ref={ref} arrow title={<PopVert content={options}/>} placement="left"
    >{x[y] || <span {...attributes}>{children}</span>}</Tooltip>;
    //TODO replce tooltip with leftVert
    // return <LeftVert
    //     {...attributes}
    //     buttons={buttons}
    //     options={options}
    //     button={<MoreVertIcon/>}
    // > {children} </LeftVert>;

};
export default Render_element;
