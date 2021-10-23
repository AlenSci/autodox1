import {gql} from "@apollo/client";

const SEND = gql(`
    mutation send($send: String!){
    send(number:$send)
    }

`)

export default SEND
// export {SIGN_IN}