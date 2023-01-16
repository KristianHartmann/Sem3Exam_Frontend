import React, { useState } from "react";
import facade from "../apiFacade";

const UserData = () => {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setUserInfo({});
    setMessage("");
    if (username) {
      const options = facade.makeOptions("POST", true, {
        username: username
      });
      fetch(`https://kiah.dk/tomcat/Sem3Exam/api/user/user`, options)
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
            if (res.role) {
              setUserInfo({
                username: res.username,
                role: res.role
              });
            } else {
              setUserInfo({
                username: res.username
              });
            }
          }
        })
        .catch((err) => {
          setMessage("Error " + err);
        });
    }
  };

  return (
    <div>
      <h3>Search for a user</h3>
      <form onSubmit={handleSearch}>
        <input
          className="input-field"
          type="search"
          placeholder="User Search...."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
      {userInfo.username && <p>Username: {userInfo.username}</p>}
      {userInfo.role && <p>Role: {userInfo.role}</p>}
      <p>{message}</p>
    </div>
  );
};

export default UserData;
