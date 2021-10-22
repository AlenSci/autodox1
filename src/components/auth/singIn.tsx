import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, DialogActions, DialogContent} from "@mui/material";
import {findDOMNode} from "react-dom";
import MutationHook from "../../hooks/mutation_hook";
import {SIGN_IN} from "../../queries/auth";

export default function SingIn() {
    const [x,y,data] = MutationHook(SIGN_IN)
    const onclick = (e:any) => {
        e.preventDefault()
        console.log(e.target['password'].value, e.target['username'].value)
        x({password: e.target['password'].value, username: e.target['username'].value})
    };
    console.log(data)
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
                <div
                    onKeyDown={(e: any) => {
                        if (e.keyCode == 13) {

                            var active: any = document.activeElement
                            console.log(findDOMNode(active.nextComponent))

                            // try {
                            //     active.nextElementInput.nextElementInput.nextElementInput.nextElementInput.nextElementInput.focus()
                            // } catch (err) {
                            // } finally {
                            // }

                        }
                    }}
                >
                    <form onSubmit={(e: any) => onclick(e)}>
                        <TextField name={'username'} type="username" id="standard-basic" label="Username"
                                   variant="standard"/>
                        <TextField name={'password'} type="password" id="standard-basic" label="Password"
                                   variant="standard"/>
                        <DialogActions>
                            {y(<Button type="submit"> submit </Button>)}
                        </DialogActions>
                    </form>
                </div>

            </DialogContent>
        </div>
    );



};
