import React, {useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, List} from "@mui/material";
import Popover from "@mui/material/Popover";


const LeftVert = (props: any) => {
    const [over, setOver] = useState(false)
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


    return (
        <span onMouseLeave={() => setOver(false)}
              onMouseEnter={() => setOver(true)}
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
                {props.options.map((i: any) => <ListItem
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

            <span
                style={{display:'inline-block', opacity: over ? '80%' : '0', transitionDuration: '100', transition: 'opacity 0.3s'}}>
               {props.buttons.map((i: any) => <IconButton onClick={i.onClick}>
                   {i.icon}
               </IconButton>)}
                <IconButton onClick={handleVertClick}>{props.button}</IconButton>
            </span>
            {props.children}
        </span>
    );
};
export default LeftVert