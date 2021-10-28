import React from "react";
import {useGoogleLogin} from 'react-google-login'
import {IconButton, Tooltip} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import MutationHook from "./hooks/mutation_hook";
import {GOOGLE_AUTH} from "./queries/auth";

export default function OAuth2() {
    const [x, y, data] = MutationHook(GOOGLE_AUTH)
    const {signIn, loaded, signOut} = useGoogleLogin({
        onSuccess: (e) => {
            x({token:e.tokenObj.id_token})
            localStorage.setItem('image', e.profileObj.imageUrl)
        },
        clientId: '218303560881-osv51bj8cmnq71sopn3331t2k7stkcvb.apps.googleusercontent.com',
        // clientSecret: "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",
        onFailure: (e) => {
            console.log(e)
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
        {y(<Tooltip title="Sign in" followCursor>
            <IconButton style={{color: 'white'}} color='success' onClick={signIn}><GoogleIcon/></IconButton>
        </Tooltip>)}
    </div>);
};