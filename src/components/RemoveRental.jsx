import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";

    

const RemoveRental = () => {
  const [message, setMessage] = useState("");
  const [rentalId, setRentalId] = useState("");

  const handleRemove = (event) => {
    event.preventDefault();
    setMessage("");
    if (rentalId) {
      const options = facade.makeOptions("DELETE", true, {
        rentalId: rentalId
      });
      fetch(`${API_URL}/admin/removeRental`, options)
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
            setMessage("Rental not found");
          } else {
            throw new Error(res.statusText);
          }
        })
        .then((res) => {
          if (res) {
           setMessage("Rental deleted");
          }
        })
        .catch((err) => {
          setMessage("Error " + err);
        });
    }
  };

  return (
    <div>
      <h3>Remove a rental</h3>
      <form onSubmit={handleRemove}>
        <input
          className="input-field"
          type="search"
          placeholder="Rental search...."
          onChange={(e) => setRentalId(e.target.value)}
          value={rentalId}
        />
        <button type="submit" className="btn">
          Remove
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RemoveRental;

