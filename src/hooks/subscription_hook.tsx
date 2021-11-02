import {useSubscription} from "@apollo/client";
import {CircularProgress, Fade} from "@mui/material";
import React from "react";

export default function SubscriptionHook(QUERY: any, vars: any) {
    const {data, loading, error} = useSubscription(QUERY, {variables: vars});
    const is_loading = (Component: any) => {
        return loading ? <CircularProgress />: <Fade in={true}><div style={{}}>{Component}</div></Fade>
    };
    return [is_loading, data || '']
};