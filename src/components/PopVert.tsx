import Popover from "@mui/material/Popover";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {IconButton, List} from "@mui/material";
import React from "react";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const PopVert = (props: any) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    // @ts-ignore

    const handleVertClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleVertClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (<IconButton
        draggable={true}
        style={{color: 'white'}}
        onClick={handleVertClick}

    >
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleVertClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <List>
                {props.content.map((i: any) => <ListItem
                    onClick={i.onClick}
                    disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {i.icon}
                        </ListItemIcon>
                        <ListItemText primary={i.title}/>
                    </ListItemButton>
                </ListItem>)}
            </List>

        </Popover>

        <MoreVertRoundedIcon/>
    </IconButton>);
};
export default PopVert;