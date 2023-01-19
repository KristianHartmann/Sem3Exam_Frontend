import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";
const UpdateHouse = () => {
  const [houseId, setHouseId] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(address.trim() === '') {
      setError('All fields are required')
    } else {
      try {
        const options = facade.makeOptions("PATCH", true, {
            houseId: houseId,
            address: address,
            numberOfRooms: numberOfRooms
        });
        const res = await fetch(
          API_URL+'/admin/updateHouse',
          options
        );
        const data = await res.json();
        if(res.ok) {
            setHouseId('');
          setAddress('');
          setNumberOfRooms('');
          setSuccess('House successfully updated');
        } else {
          setError('An error occured while updating the House')
        }
      } catch (error) {
        setError('An error occured while updating the House')
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Update a House</h3>
        <label>
        House ID:
        <input className="input-field"
          type="number"
          value={houseId}
          onChange={e => setHouseId(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Address:
        <input className="input-field"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        Number of rooms:
        <input className="input-field"
          type="number"
          value={numberOfRooms}
          onChange={e => setNumberOfRooms(e.target.value)}
        />
      </label>
      <br />

      <button type="submit" className="btn">Update House</button>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default UpdateHouse;
