import React, {useState} from "react";
import {TableCell, Tooltip} from "@mui/material";
import {ReactEditor, useSlate} from "slate-react";
import {Editor} from "slate";
import Formula from 'fparser';

const TableCellComponent = (props: any) => {
    const editor: any = useSlate()
    const [mouseEnter, setMouseEnter] = useState(false)

    const regex = /-.+/gi;

    const cell_id = props.element.id
    const table_id = cell_id.replace(regex, '')



    const cell_text = props.element.children[0].text
    // const cell_vars =
    const find_vars = /\[(\w+)\]/gi;
    // @ts-ignore

    var result:any
    const is_formula = cell_text && cell_text[0] === '='

    if (is_formula) {
        console.log('is_formula')
        const array = [...cell_text.matchAll(find_vars)];
        const newarray = array.map((i: any, index: number) => array[index][1])
        console.log({array: newarray});
        var evaluatoins = {}

        newarray.map((i: string) => {
            const [match]: any = Editor.nodes(editor, {
                at: [],
                match: (n: any) => {
                    return cell_id ? (n.id === table_id + '-' + i) : false
                },
            })
            var match_text: any
            try {
                match_text = match[0].children[0].text;
            } catch (e) {
            }
            // @ts-ignore
            evaluatoins[i] = match_text;
            console.log({evaluatoins:evaluatoins, match_text:match_text})

        });



        const fObj = new Formula();
        try {
            fObj.setFormula(cell_text);
            result = fObj.evaluate(evaluatoins);
        } catch (e) {
        }
    }

    var content: any
    if (is_formula && !mouseEnter) {
        content = result
    } else {
        content = props.children
    }

    return (<TableCell
        onMouseEnter={() => {
            setMouseEnter(true)
        }}
        onMouseLeave={() => {
            setMouseEnter(false)
        }}
        {...props.attributes}>
        <Tooltip
            title={`id: ${cell_id.replace(/(.+)-(.+)/gi, '$2')} result: ${result}`}
            placement="top"
            arrow
        >
            <span>
                {content}
            </span>
        </Tooltip>

    </TableCell>);
};
export default TableCellComponent