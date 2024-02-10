import React, { useContext } from 'react'
import { UserContext } from '../context/User';

function UserContact() {
    let {userData,loader} = useContext(UserContext);
    if(loader){
        return (
            <h2>Loading...</h2>
          )
    }
  return (
      <div className='user-contact'>
      <div className='ms-3 mt-3'><span>Email : </span><a href='#'>{userData.email}</a></div>   
         <p>{userData.phone}</p>
      </div>
  )
}

export default UserContact