import { useApolloClient } from '@apollo/client'
import React from 'react'
function UserChip(username: string, select?: boolean) {
  // const classes = useStyles()

  const client: any = useApolloClient()

  var user: { username: string; imageUrl: string } = {
    username: '',
    imageUrl: '',
  }
  const parsed_users = client.cache.data.data.ROOT_QUERY.users
  user = parsed_users.find((item: any) => item.username === username)

  return (
    <span
      style={{
        paddingRight: '0.3em',
        paddingBottom: '0px',
        display: 'inline-block',
        borderRadius: '50em',
        backgroundColor: select ? 'lightblue' : 'lightgray',
      }}
    >
      <img
        style={{
          border: '0.1em solid gray',
          float: 'left',
          height: '1.2em',
          width: '1.2em',
          borderRadius: '50%',
        }}
        alt={username[0]}
        src={user.imageUrl}
      />
      {username}
    </span>
  )
}

export default UserChip
