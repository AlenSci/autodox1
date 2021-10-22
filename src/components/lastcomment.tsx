import {useSubscription} from "@apollo/client";
import {gql} from "apollo-boost";
import {CircularProgress} from "@mui/material";
import React from "react";
import SubscriptionHook from "../hooks/subscription_hook";

const COMMENTS_SUBSCRIPTION = gql(`
subscription counter {
counter
}

`);

function LatestComment() {
  const [x, data] = SubscriptionHook(COMMENTS_SUBSCRIPTION, {id:0});
  return (
      <div>
        {x(<h1>{data.counter}</h1>)}
      </div>
  )
  // const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION)
  // if (loading){
  //   return <CircularProgress />
  // } else {
  //   return ()
  // }
}
export default LatestComment;