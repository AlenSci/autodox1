import React from "react";
import {useGoogleLogin} from 'react-google-login'
import {Button,Tooltip, IconButton} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import { Route, Redirect } from 'react-router'

export default function OAuth2() {
    const {signIn, loaded, signOut} = useGoogleLogin({
        onSuccess: (e) => {
            console.log(e.profileObj.familyName)
            console.log(e.profileObj.email)
            console.log(e.profileObj.givenName)
            console.log(e.profileObj.googleId)
            console.log(e.profileObj.imageUrl)
            console.log(e.profileObj.name)
            console.log(e.tokenObj.id_token)
            console.log(e.tokenObj.access_token)
            console.log(e.tokenObj.login_hint)
            console.log(e.tokenObj.expires_in)
        },
        // onAutoLoadFinished,
        clientId: '218303560881-osv51bj8cmnq71sopn3331t2k7stkcvb.apps.googleusercontent.com',
        // clientSecret: "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",
        onFailure: (e)=>{
            console.log(e)
        },
        cookiePolicy:'single_host_origin'
    });

    return (<div>
        <Tooltip title="Sign in" followCursor>
            <IconButton style={{color:'white'}} color='success' onClick={signIn}><GoogleIcon /></IconButton>
        </Tooltip>


    </div>);
};