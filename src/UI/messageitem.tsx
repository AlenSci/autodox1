import React from 'react';
import {
    Avatar,
    Box,
    FormControlLabel,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Slide,
    Switch,
    Typography
} from "@mui/material";

export default function MessageItem(props: any) {

    return (
        <Slide direction="up" in={true}>
            <ListItem
                style={{
                    background: 'lightblue',
                    borderRadius: '40px',
                    marginBottom: '5px',
                    paddingTop: '0',
                    paddingBottom: '0'
                }}
                alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={props.title} src={props.image}/>
                </ListItemAvatar>
                <ListItemText
                    primary={props.title}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {props.content}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </Slide>

    );
};
