import {useSubscription} from "@apollo/client";
import {CircularProgress} from "@mui/material";

export default function SubscriptionHook(QUERY:any, vars:any){
    const { data, loading } = useSubscription(QUERY,{variables: vars})
    const is_loading = (Component: any) => {
        return loading ? <CircularProgress /> : Component
    };
    //TODO fix this issue in which this hook should allow using dynamic data before **loading**
    return [is_loading, data || {counter:0}]
}