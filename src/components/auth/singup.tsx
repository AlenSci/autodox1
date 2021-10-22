import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, DialogActions, DialogContent} from "@mui/material";
import SIGN_UP from '../../queries/auth'
import MutationHook from "../../hooks/mutation_hook";
import {useSnackbar, VariantType} from "notistack";

export default function SingUp() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [x,y,data] = MutationHook(SIGN_UP)
    const onclick = (e:any) => {
        e.preventDefault()
        if (e.target['password'].value  != e.target['con_password'].value){
            const variant: VariantType = "error"
            enqueueSnackbar('password fields does not match', {variant});
        } else{
        x({password: e.target['password'].value, username: e.target['username'].value})

        }
    };

    return <div
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
            <form onSubmit={(e: any) => onclick(e)}>
                <TextField required name={'username'} type="username" id="standard-basic" label="Username" variant="standard"/>
                <TextField required type="email" id="standard-basic" label="E-mail" variant="standard"/>
                <TextField required name={'password'} type="password" id="standard-basic" label="Password" variant="standard"/>
                <TextField
                    required
                    name={'con_password'}
                    type="password" id="standard-basic" label="Conform password" variant="standard"/>
                <DialogActions>
                    {y(<Button type="submit"> submit </Button>)}
                </DialogActions>
            </form>
        </DialogContent>


    </div>;
};
