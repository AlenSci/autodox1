import * as React from 'react';
import {styled} from '@mui/material/styles';
import Tooltip, {tooltipClasses, TooltipProps} from '@mui/material/Tooltip';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {EditableVoidElement} from "../custom-types";
import {Editor, Transforms} from "slate";
import {ReactEditor, useSlate} from "slate-react";

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip placement="left" {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
    },
}));

export default function CustomizedTooltips(props: any) {
    const editor = useSlate()
    var target: any = document.getElementById(props.element.id)

    target = target ? ReactEditor.toSlateNode(editor, target) : null
    var path = target && ReactEditor.findPath(editor, target)

    const [match]: any = Editor.nodes(editor, {
        match: (n: any) => {
            return n.type === 'data-grid'
        },
    })
    return (
        <div contentEditable={false}>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <IconButton
                            onClick={(event: any) => {
                                console.log(`onClick editable void path: ${path}`)
                                event.preventDefault()

                                const voidNode: EditableVoidElement | any = [{
                                    id: `${path}+1`,
                                    type: 'editable-void',
                                    children: [{
                                        id: `${path}+1`,
                                        type: 'paragraph',
                                        children: [
                                            {text: ''},
                                        ],
                                    }],
                                }]
                                path[0] += 1
                                Transforms.insertNodes(editor, voidNode, {at: path})
                            }}
                        >
                            <AddIcon/>
                        </IconButton>

                        <IconButton>
                            <DragIndicatorIcon/>
                        </IconButton>


                    </React.Fragment>
                }
            >

                <span>{props.children}</span>
            </HtmlTooltip>
        </div>
    );
}
