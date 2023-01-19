import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";

const UserTest = () => {
  const [message, setMessage] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setMessage("");
      const options = facade.makeOptions("GET", true);
    
      fetch(`${API_URL}/user/userTest`, options)
        .then((res) => {
          if (res.status === 401) {
            return res.json()
              .then((json) => {
                if (json.code === 401) {
                  setMessage(json.message);
                } else {
                  setMessage("You are not authorized to view this information.");
                }
              });
          } else if (res.ok) {
            return res.json()
            .then((json) => {
                setMessage(json.msg)
            });
          }  else {
            throw new Error(res.statusText);
          }
        })
        .catch((err) => {
          setMessage("Error " + err);
        });
    
  };

  return (
    <div>
      <h3>Are you user?</h3>
      <form onSubmit={handleSearch}>
        <button type="submit" className="btn">
          Test
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UserTest;
