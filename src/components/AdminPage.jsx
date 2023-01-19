import React from 'react';
import CreateHouse from './CreateHouse';
import RemoveRental from './RemoveRental';
import SeeAllTenantsInHouse from './SeeAllTenantsInHouse';
import UserData from './UserData';
import UserDataAll from './UserDataAll.jsx';
import UserRemove from './UserRemove';
import CreateRental from './CreateRental';

const AdminPage = () => {
    return (
        <div>
            <UserData />
            <UserDataAll />
            <UserRemove />
            <RemoveRental/>
            <SeeAllTenantsInHouse/>
            <CreateHouse />
            <CreateRental/>
        </div>
    )
}

export default AdminPage;