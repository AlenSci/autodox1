import React from 'react'
import {Route, Switch} from "react-router-dom";
import Grid from "@mui/material/Grid";
import RecipeReviewCard from "../UI/card";
import Starred from "./Starred";

function Inbox() {
  // let { username }: any = useParams()

    return (
        <Route path="/Inbox">
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <RecipeReviewCard/>
                    </Grid>
                ))}

            </Grid>


        </Route>
    );
}

export default Inbox
