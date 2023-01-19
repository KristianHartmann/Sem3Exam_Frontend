import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";
const CreateHouse = () => {
  const [address, setAddress] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(address.trim() === '') {
      setError('All fields are required')
    } else {
      try {
        const options = facade.makeOptions("POST", true, {
          address: address,
          numberOfRooms: numberOfRooms,
          cityinfoId: "2",
        });
        const res = await fetch(
          API_URL+'/admin/createHouse',
          options
        );
        const data = await res.json();
        if(res.ok) {
            setAddress('');
            setNumberOfRooms('');
          setError(null);
          setSuccess('House successfully created');
        } else {
          setError('An error occured while creating the House')
        }
      } catch (error) {
        setError('An error occured while creating the House')
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Create House</h3>
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
      <button type="submit" className="btn">Create House</button>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default CreateHouse;
