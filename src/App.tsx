import React from 'react';
import './App.css';
import PersistentDrawerLeft from './main/dashboard'
import {Posts} from "./components/posts";
import {BrowserRouter as Router} from "react-router-dom";
import {DrawerContent} from "./components/DrawerContent";
import {Bar} from "./components/bar";
import MyCom from './components/mycom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ApolloProvider, createHttpLink,InMemoryCache, ApolloClient , HttpLink,} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const authLink = setContext((_, { headers }) => {
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
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function App() {
const [open, setOpen] = React.useState(false);

const handleClick = () => {
setOpen(true);
};

const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
if (reason === 'clickaway') {
return;
}

setOpen(false);
};


return (
<ApolloProvider client={client}>
<Stack spacing={2} sx={{ width: '100%' }}>
<Button variant="outlined" onClick={handleClick}>
Open success snackbar
</Button>
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    This is a success message!
    </Alert>
</Snackbar>
<Router>
<PersistentDrawerLeft Bar={Bar} DrawerContent={DrawerContent} Component={Posts}/>
</Router>
<MyCom/>
<Button variant="outlined" onClick={handleClick}>
Open success snackbar
</Button>
</Stack>
</ApolloProvider>
);
}

export default App;
