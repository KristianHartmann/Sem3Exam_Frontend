import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";
const CreateRental = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priceAnnual, setPriceAnnual] = useState("");
  const [deposit, setDeposit] = useState("");
  const [contactPersonId, setContactPersonId] = useState("");
  const [houseId, setHouseId] = useState("");
  const [tenantNames, setTenantNames] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(startDate.trim() === '' || endDate.trim() === '') {
      setError('All fields are required')
    } else {
      try {
        const tenantNameArray = tenantNames.split(',');
        const options = facade.makeOptions("POST", true, {
            startDate: startDate,
            endDate: endDate,
            priceAnnual: priceAnnual,
            deposit: deposit,
            contactPersonId: contactPersonId,
            houseId: houseId,
            tenantNames: tenantNameArray,
        });
        const res = await fetch(
          API_URL+'/admin/createRental',
          options
        );
        const data = await res.json();
        if(res.ok) {
          setStartDate('');
          setEndDate('');
          setPriceAnnual('');
          setDeposit('');
          setContactPersonId('');
          setHouseId("");
          setTenantNames("");
          setSuccess('Rental successfully created');
        } else {
          setError('An error occured while creating the Rental')
        }
      } catch (error) {
        setError('An error occured while creating the Rental')
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Create a rental</h3>
      <label>
        Start Date:
        <input className="input-field"
          type="text"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        End Date:
        <input className="input-field"
          type="text"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Price Annual:
        <input className="input-field"
          type="number"
          value={priceAnnual}
          onChange={e => setPriceAnnual(e.target.value)}
        />
      </label>
      <br />
      <label>
        Deposit :
        <input className="input-field"
          type="number"
          value={deposit}
          onChange={e => setDeposit(e.target.value)}
        />
      </label>
      <br />
      <label>
        Contact Person:
        <input className="input-field"
          type="number"
          value={contactPersonId}
          onChange={e => setContactPersonId(e.target.value)}
        />
      </label>
      <br />
      <label>
        House :
        <input className="input-field"
          type="number"
          value={houseId}
          onChange={e => setHouseId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Tenant Names:
        <input className="input-field"
          type="text"
          value={tenantNames}
          onChange={e => setTenantNames(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="btn">Create Rental</button>
      {success && <p>{success}</p>}
    </form>
  );
};

export default CreateRental;
