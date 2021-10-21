import React from 'react';
import { useQuery,useLazyQuery, gql } from '@apollo/client';
import debug from "../dev/debug";

const GET_DOGS = gql(`
    query {
    users {
    id
    username
    }
    }
`)


function MyCom() {
    const [GetData, {loading, data, error}] = useLazyQuery(GET_DOGS);
    // const { loading, error, data } = useQuery(GET_DOGS);
    const x = [1,2,3]
    const y = 2
    if (loading){
        console.log('...');
    } else{
    console.log({data:data});
    console.log({error:error})
    }

  return (

      <div>
          <button onClick={()=>GetData()}>
              xxxx
          </button>
      </div>
  );
}

export default MyCom

