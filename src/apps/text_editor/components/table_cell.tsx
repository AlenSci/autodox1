import React, {useState} from "react";
import {TableCell, Tooltip} from "@mui/material";
import {ReactEditor, useSlate} from "slate-react";
import {Editor} from "slate";
import Formula from 'fparser';

const TableCellComponent = (props: any) => {
    const editor: any = useSlate()
    const [mouseEnter, setMouseEnter] = useState(false)

    const find_cell_id = /-(.+)/gi;

    const cell_id = props.element.id
    const cell_detentions = find_cell_id.exec(cell_id)
    const column_number = cell_detentions&& cell_detentions[1][1]
    const row_number = cell_detentions&& cell_detentions[1][0]
    const table_id = cell_id.replace(find_cell_id, '')

    const cell_text = props.element.children[0].text
    // const cell_vars =
    const find_vars = /\[(\w+)\]/gi;
    // @ts-ignore

    var result: any
    const is_formula = cell_text && cell_text.replace(' ','')[0] === '='

    const [column_match]: any = Editor.nodes(editor, {
        at: [],
        match: (n: any) => {
            return cell_id ? (n.id === table_id + '-0' + column_number) : false
        },
    })
    const column_value = column_match && column_match[0].children[0].text;
    const is_column_formula = column_value&& column_value.replace(' ','')[0] === '='

    if (is_column_formula) {
        const cell_vars = [...column_value.matchAll(find_vars)];
        const newarray = cell_vars.map((i: any, index: number) => cell_vars[index][1])
        var evaluatoins = {}
        newarray.map((i: string) => {
            const [match]: any = Editor.nodes(editor, {
                at: [],
                match: (n: any) => {
                    return cell_id ? (n.id === table_id + '-' + row_number + i) : false
                },
            })
            var match_text: any
            try {
                match_text = match[0].children[0].text;
            } catch (e) {
            }
            console.log(match_text)
            // @ts-ignore
            evaluatoins[row_number + i] = match_text;

        });
        const find_column_vars = /\[(\w+)\]/gi
        const parsed_column_value = column_value&& column_value.replaceAll(find_column_vars, `[${row_number}$1]`)
        const fObj = new Formula();
        try {
            fObj.setFormula(parsed_column_value);
            result = fObj.evaluate(evaluatoins);
        } catch (e) {
        }
    }

    if (is_formula) {
        const cell_vars = [...cell_text.matchAll(find_vars)];
        const newarray = cell_vars.map((i: any, index: number) => cell_vars[index][1])
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

    if (row_number > 0 && is_column_formula) {
        content = result
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