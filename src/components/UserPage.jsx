import React from 'react';
import GetUserRental from './GetUserRental';
import UserTest from './UserTest';
import facade from '../apiFacade';

const UserPage = () => {
    return (
        <>
            <UserTest />
            <GetUserRental username={facade.getUserName}/>
        </>
    )
}

export default UserPage;