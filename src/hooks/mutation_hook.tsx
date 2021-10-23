import {useMutation} from "@apollo/client";
import {CircularProgress} from "@mui/material";

export default function MutationHook(QUERY: any) {
    const [mutateFunction, {data, loading, error}] = useMutation(QUERY);
    const activate = (vars: any) => {
        mutateFunction({variables: vars}).catch(e => {
            console.log(e)
        });
    }
    const is_loading = (Component: any) => {
        return loading ? <CircularProgress/> : Component
    };


    return [activate, is_loading, data || '']
};