import React from 'react';
import {List} from "@mui/material";
import MessageItem from "./messageitem";

export default function AlignItemsList(props: any) {
    return (
        <List style={{overflow: 'hidden'}} sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {props.items.map((item: any, index: number) => {
                return (<MessageItem {...item} />);
            })}
        </List>
    );
};
