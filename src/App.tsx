import React from 'react';
import './App.css';
import PersistentDrawerLeft from './main/dashboard'
import {Posts} from "./components/posts";
import {BrowserRouter as Router} from "react-router-dom";
import {DrawerContent} from "./components/DrawerContent";
import {Bar} from "./components/bar";
import MyCom from './components/mycom'
import Stack from '@mui/material/Stack';
import {ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache,} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {useSnackbar} from 'notistack';
import {onError} from "@apollo/client/link/error";
import {Button} from "@mui/material";


function App() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const authLink = setContext((_, {headers}) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('token');
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const httpLink = createHttpLink({
        uri: 'http://localhost:8000/',
    });

    const errorLink = onError(({graphQLErrors, networkError}) => {
        const variant = 'error'
        if (graphQLErrors){
            enqueueSnackbar(<div style={{display:'flex'}}>

                <div
            >{JSON.stringify(graphQLErrors[0]['message'])}</div>
                <Button
            onClick={()=>closeSnackbar()}
            >x</Button>

            </div>, {variant});
        }
        // console.log({networkError: networkError})
        // console.log({graphQLErrors:graphQLErrors})
    });


    const client = new ApolloClient({
        link: ApolloLink.from([errorLink,httpLink, authLink]),
        cache: new InMemoryCache()
    });


    return (
        <ApolloProvider client={client}>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Router>
                    <PersistentDrawerLeft Bar={Bar} DrawerContent={DrawerContent} Component={Posts}/>
                </Router>
                <MyCom/>
            </Stack>
        </ApolloProvider>
    );
}

export default App;
