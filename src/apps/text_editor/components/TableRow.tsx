import React, {useRef} from "react";
import {IconButton, TableRow} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import {Transforms} from "slate";
import {mentoin_element} from "../inserts/mentoin_element";
import {ReactEditor, useSlate} from "slate-react";
import FindMatch from "../../../Functions/FindMatch";
import uniqid from "uniqid";

const TableRowComponent = (props: any) => {
    const ref: any = useRef<HTMLDivElement | null>();
    const editor: any = useSlate()
    const find_cell_id = /(.+)-(.+)/gi;
    const row_id = props.element.id
    const row_number = row_id.replace(find_cell_id, '$2')
    const table_id = row_id.replace(find_cell_id, '$1')
    const newRowid = table_id + '-' + (parseInt(row_number) + 1)
    const new_row = {
        type: 'table-row',
        id: newRowid,
        children: [
            {
                id: newRowid + '0',
                type: 'table-cell',
                children: [{text: 'new one is here.', bold: true}],
            },
            {
                id: newRowid + '1',
                type: 'table-cell',
                children: [{text: '2'}],
            },
            {
                id: newRowid + '2',
                type: 'table-cell',
                children: [{text: '4'}],
            },
            {
                id: newRowid + '3',
                type: 'table-cell',
                children: [{text: '4'}],
            },
        ],
    }


    const handleClick = (e: any) => {
        const x = FindMatch(editor, (n: any) => n.id === row_id, false)
        // console.log(props.element);
        var target: any = null
        try {
            target = ReactEditor.toSlateNode(editor, ref.current)
        } catch (e) {
            console.error(e)
        }
        var path = ReactEditor.findPath(editor, target)
        path[1] += 1
        Transforms.insertNodes(editor, new_row, {at: path, offset: 1})
    };

    //insert column




    return (<Tooltip ref={ref} arrow title={
        <IconButton
            style={{color: 'white'}}
            onClick={handleClick}
        >
            <AddIcon/>
        </IconButton>
    } placement="left">
        <TableRow  {...props.attributes}>{props.children}</TableRow>
    </Tooltip>);

};
export default TableRowComponent