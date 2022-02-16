import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {Link} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export function DrawerContent() {
    return (<div>

        <Divider/>
        <List>
            {['Inbox', 'api', 'Drafts','text_editor_3','text_editor_4'].map((text, index) => (
                <Link to={'/' + text}>
                    <div>
                        <ListItem button key={text}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    </div>
                </Link>
            ))}
        </List>


    </div>)
}