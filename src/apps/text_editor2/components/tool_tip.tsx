import * as React from 'react';
import {styled} from '@mui/material/styles';
import Tooltip, {tooltipClasses, TooltipProps} from '@mui/material/Tooltip';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {EditableVoidElement} from "../custom-types";
import {Transforms} from "slate";
import {useSlate} from "slate-react";

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
    return (
        <div>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <IconButton
                            onClick={(event: any) => {
                                event.preventDefault()
                                const voidNode: EditableVoidElement = {
                                    type: 'editable-void',
                                    children: [{text: ''}],
                                }
                                props.path[0] += 1
                                Transforms.insertNodes(editor, voidNode, {at: props.path})
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
