import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import "../styles/header.css";
import { API_URL } from "../config";
import Rental from "./Rental";

const RentalDataAll = () => {
    const [rentalInfo, setRentalInfo] = useState([]);
    const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);


  const handleShowRental = () => {
    setShowTable(true);
    const options = facade.makeOptions("GET", true);
    fetch(`${API_URL}/rental/all`, options)
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
          setMessage("No rentals found");
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((res) => {
        if (res) {
          setRentalInfo(res);
        }
      })
      .catch((err) => {
        setMessage("Error " + err);
      });
  };
  
  const handleHideRentals = () => {
    setShowTable(false);
  }

  return (
    <div>
      {!showTable && <button onClick={handleShowRental}  className="btn">Show all rentals</button>}
      {showTable && (
        <>
         <button onClick={handleHideRentals} className="btn">Hide all rentals</button>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Start date</th>
                <th>End date</th>
                <th>Price annual</th>
                <th>Deposit</th>
                <th>Address</th>
                <th>More Info</th>

              </tr>
            </thead>
            <tbody>
              {rentalInfo.map((rental) => (
                <tr key={rental.rentalId}>
                  <td>{rental.startDate}</td>
                  <td>{rental.endDate}</td>
                  <td>{rental.priceAnnual}</td>
                  <td>{rental.deposit}</td>
                  <td>{rental.houseDto.address}</td>
                  <td><button onClick={() => setSelectedRental(rental)}>Show more info</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedRental && <Rental rental={selectedRental}/>}
        </>
      )}
      <p>{message}</p>
    </div>
  );
};

export default RentalDataAll;
