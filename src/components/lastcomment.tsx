import {gql} from "apollo-boost";
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
}
export default LatestComment;