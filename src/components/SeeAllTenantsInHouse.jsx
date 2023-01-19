import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import "../styles/header.css";
import { API_URL } from "../config";

const SeeAllTenantsInHouse = () => {
  const [tenantInfo, setTenantsInfo] = useState([]);
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [houseId, setHouseId] = useState("");
  const handleSeeAllTenantsInHouse = (event) => {
    event.preventDefault();
    setShowTable(true);
    if(houseId){
    const options = facade.makeOptions("POST", true, {
        houseId: houseId
      });
    fetch(`${API_URL}/admin/tenantsInHouse`, options)
      .then((res) => {
        if (res.status === 403) {
          return res.json()
            .then((json) => {
              if (json.code === 403) {
                setMessage(json.message);
              } else {
                setMessage("You are not authorized to view this information.");
              }
            });
        } else if (res.ok) {
          return res.json();
        } else if (res.status === 204) {
          setMessage("No houses found");
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((res) => {
        if (res) {
            setTenantsInfo(res);
        }
      })
      .catch((err) => {
        setMessage("Error " + err);
      });
  };
  
}
  const handleHideTenants = () => {
    setTenantsInfo("");
    setShowTable(false);
  }

  return (
    <div>
        <form onSubmit={handleSeeAllTenantsInHouse}>
            <h3>Search for a house to see tenants</h3>
         <input
              className="input-field"
              type="search"
              placeholder="Search for a house to see tenants ...."
              onChange={(e) => setHouseId(e.target.value)}
              value={houseId}
        />
      {!showTable && <button type="submit" className="btn">Search</button>}
      {showTable && (
        <>
         <button onClick={handleHideTenants} className="btn">Hide all Tenants</button>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
            {tenantInfo && tenantInfo.tenantDto && tenantInfo.tenantDto.map((tenant) => (
            <tr key={tenant.user_name}>
                <td>{tenant.user_name}</td>
                <td>{tenant.name}</td>
                <td>{tenant.phone}</td>
             </tr>
            ))}
            </tbody>
          </table>
        </>
      )}
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SeeAllTenantsInHouse;