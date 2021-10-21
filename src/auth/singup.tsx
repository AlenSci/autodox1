import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, DialogActions, DialogContent} from "@mui/material";

export default function SingUp() {
    return (
        <div
            style={{
                    padding: "0"
                }}
        >
            <DialogContent
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "1px"
                }}
            >
                <TextField id="standard-basic" label="Username" variant="standard"/>
                <TextField id="standard-basic" label="E-mail" variant="standard"/>
                <TextField id="standard-basic" label="Password" variant="standard"/>
                <TextField id="standard-basic" label="Conform password" variant="standard"/>
            </DialogContent>
            <DialogActions>
                <Button type='submit'> submit </Button>
            </DialogActions>
        </div>
    );



};
