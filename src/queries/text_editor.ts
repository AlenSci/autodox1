import {gql} from "@apollo/client";
import SIGN_UP from "./auth";

const COLLAPORATOIN = gql(`
mutation collaborate($properties:String!){
  collaborate(properties:$properties)
}
`)


const COLLAPORATOIN_SUB = gql(`
subscription collaborate{
  collaborate{
    message
    sender
  }
}
`)
export default COLLAPORATOIN
export {COLLAPORATOIN_SUB}