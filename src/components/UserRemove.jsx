import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";

    

const UserRemove = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const handleRemove = (event) => {
    event.preventDefault();
    setMessage("");
    if (username) {
      const options = facade.makeOptions("POST", true, {
        username: username
      });
      fetch(`${API_URL}/user/remove`, options)
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
            setMessage("User not found");
          } else {
            throw new Error(res.statusText);
          }
        })
        .then((res) => {
          if (res) {
           setMessage("User deleted");
          }
        })
        .catch((err) => {
          setMessage("Error " + err);
        });
    }
  };

  return (
    <div>
      <h3>Remove a user</h3>
      <form onSubmit={handleRemove}>
        <input
          className="input-field"
          type="search"
          placeholder="User Search...."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button type="submit" className="btn">
          Remove
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UserRemove;

