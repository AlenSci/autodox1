import React from 'react'
import {Route} from "react-router-dom";
import Typography from '@mui/material/Typography';

function SendEmail() {
    return (
        <Route path="/api">
            <Typography variant='h6'>You can test the api here. </Typography>
            <iframe style={{width:'100%', height:'500px', margin:0}} src="http://127.0.0.1:8000/" title="graphql api"></iframe>
        </Route>
    );
}

export default SendEmail
