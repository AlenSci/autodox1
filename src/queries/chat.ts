import {gql} from "@apollo/client";

const SEND = gql(`
    mutation send($send: String!){
    send(number:$send)
    }

`)


const MESSAGES_SUBSCRIPTIONS = gql(`
subscription chat{
  chat{
    sender
    message
  }
}
`);


export default SEND
export {MESSAGES_SUBSCRIPTIONS}