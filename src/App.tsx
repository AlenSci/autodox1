import React from 'react';
import './App.css';
import PersistentDrawerLeft from './UI/main/dashboard'
import {Posts} from "./components/posts";
import {BrowserRouter as Router} from "react-router-dom";
import {DrawerContent} from "./UI/bar/DrawerContent";
import {Bar} from "./UI/bar/bar";
import Stack from '@mui/material/Stack';
import {ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache, split,} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {useSnackbar, VariantType} from 'notistack';
import {onError} from "@apollo/client/link/error";
import LatestComment from './components/lastcomment'
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from "@apollo/client/utilities";


import Chat from "./components/chat";
const token =  `Bearer ${localStorage.getItem('token') || ''}`

const wsLink:any = new WebSocketLink({
  uri: 'ws://127.0.0.1:8000/',
    options: {
        reconnect: true,
        connectionParams: {
            authToken: token
        },

    }
});


function App() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                authorization: token
            }
        }
    });

    const httpLink = createHttpLink({
        uri: 'http://localhost:8000/',
    });

    const errorLink = onError(({graphQLErrors, networkError}) => {
        const variant: VariantType = "error"
        if (graphQLErrors) {
            enqueueSnackbar(graphQLErrors[0]['message'], {variant});
        }
    });


    const splitLink = split(
        ({query}: any) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        ApolloLink.from([errorLink, httpLink, authLink]),
    );

    const client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache()
    });
    return (
        <ApolloProvider client={client}>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Router>
                    <PersistentDrawerLeft Bar={Bar} DrawerContent={DrawerContent} Component={Posts}/>
                </Router>
            </Stack>
            <LatestComment/>
            <Chat/>
        </ApolloProvider>
    );
}

export default App;
