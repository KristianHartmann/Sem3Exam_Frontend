import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";
const UpdateTenants = () => {
  const [rentalId, setRentalId] = useState("");
  const [tenantNames, setTenantNames] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(tenantNames.trim() === '') {
      setError('All fields are required')
    } else {
      try {
        const tenantNameArray = tenantNames.split(',');
        const options = facade.makeOptions("PATCH", true, {
            rentalId: rentalId,
            tenantNames: tenantNameArray,
        });
        const res = await fetch(
          API_URL+'/admin/updateTenants',
          options
        );
        if(res.ok) {
            setRentalId('');
            setTenantNames('');
          setSuccess('Tenants successfully updated');
        } else {
          setError('An error occured while updating the Tenants')
        }
      } catch (error) {
        setError('Something went wrong')
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Update Tenants</h3>
        <label>
        Rental ID:
        <input className="input-field"
          type="number"
          value={rentalId}
          onChange={e => setRentalId(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Tenant Names:
        <input className="input-field"
          type="text"
          value={tenantNames}
          onChange={e => setTenantNames(e.target.value)}
        />
      </label>
    
      <button type="submit" className="btn">Update Tenants</button>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default UpdateTenants;
