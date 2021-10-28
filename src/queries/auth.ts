import {gql} from "@apollo/client";

const SIGN_UP = gql(`
    mutation signup($username: String!, $password: String!) {
    signup(username: $username,password: $password) 
    }

`)
const SIGN_IN = gql(`
mutation signin($username: String!, $password: String!) {
signin(username: $username,password: $password) 
}
`)

const GOOGLE_AUTH = gql(`
mutation google_auth($token:String!){
  google_auth(token:$token)
}
`)
export default SIGN_UP
export {SIGN_IN, GOOGLE_AUTH}