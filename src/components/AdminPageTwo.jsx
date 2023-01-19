import React from 'react';
import UpdateHouse from './UpdateHouse';
import UpdateRental from './UpdateRental';
import UpdateTenants from './UpdateTenants';

const AdminPageTwo = () => {
    return (
        <div>
          <UpdateRental />
          <UpdateHouse/>
          <UpdateTenants/>
        </div>
    )
}

export default AdminPageTwo;