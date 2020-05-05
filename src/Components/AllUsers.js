import React from 'react'
import gql from 'graphql-tag';
import { useQuery} from '@apollo/react-hooks'

const AllUsers = ()=>{
 const GET_USERS = gql`
 query{
    users{
      name
      email
    }
  }
 `
 const { loading, error, data } = useQuery(GET_USERS);
 if (loading) return 'Loading...';
 if (error) return `Error! ${error.message}`;

 console.log(data.users)

    return(
        <div>
            {data.users.map(users=>{
                return <div>

            <p>{users.name}</p>
            <p>{users.email}</p>
                </div>
            })}
        </div>
    )
}
export default AllUsers