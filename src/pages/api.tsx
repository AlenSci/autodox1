import React from 'react'
import {Route} from "react-router-dom";
import Typography from '@mui/material/Typography';

function SendEmail() {
    return (
        <Route path="/api">
            <Typography variant='h6'>You can test the api here. </Typography>
            <embed style={{borderRadius:'10px',border: '2px solid gray', width:'100%', height:'500px'}} src="http://127.0.0.1:8000/"/>
        </Route>
    );
}

export default SendEmail
