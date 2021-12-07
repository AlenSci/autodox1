import React from "react";
import {useGoogleLogin} from 'react-google-login'
import {IconButton, Tooltip} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import MutationHook from "./hooks/mutation_hook";
import {GOOGLE_AUTH} from "./queries/auth";

export default function OAuth2() {
    const [exec, load, data] = MutationHook(GOOGLE_AUTH)
    const {signIn, loaded, signOut} = useGoogleLogin({
        onSuccess: (e) => {
            exec({token:e.tokenObj.id_token})
            localStorage.setItem('image', e.profileObj.imageUrl)
        },
        clientId: '218303560881-osv51bj8cmnq71sopn3331t2k7stkcvb.apps.googleusercontent.com',
        // clientSecret: "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",
        onFailure: (e) => {
            console.log({'ffff':e})
        },
        cookiePolicy: 'single_host_origin'
    });

    if (data.google_auth) {
        localStorage.setItem('token', data.google_auth)
        window.location.reload();
    } else {
        window.localStorage.clear()
    }


    return (<div>
        {load(<Tooltip title="Sign in" followCursor>
            <IconButton
                color='primary'
                onClick={signIn}><GoogleIcon/></IconButton>
        </Tooltip>)}
    </div>);
};