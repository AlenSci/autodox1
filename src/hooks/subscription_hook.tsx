import {useSubscription} from "@apollo/client";
import {CircularProgress} from "@mui/material";

export default function SubscriptionHook(QUERY: any, vars: any) {
    const {data, loading, error} = useSubscription(QUERY, {variables: vars});
    const is_loading = (Component: any) => {
        return loading ? <CircularProgress/> : Component
    };
    return [is_loading, data || '']
};