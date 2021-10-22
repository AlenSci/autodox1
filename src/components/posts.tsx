import Grid from "@mui/material/Grid";
import RecipeReviewCard from "../UI/card";
import React from "react";
import {Route, Switch} from "react-router-dom";
// import {experimentalStyled as styled} from '@mui/material/styles';
//
// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


export function Posts() {
    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
             <Switch>
          <Route path="/Inbox">
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
                    <RecipeReviewCard/>
                </Grid>
            ))}

          </Route>
          <Route path="/Starred">
            Starred
          </Route>

         <Route path="/Send%20email">
            Send%20email
          </Route>
        </Switch>

        </Grid>
    );
}