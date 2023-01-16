import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import "../styles/header.css";

const UserDataAll = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleShowUsers = () => {
    setShowTable(true);
    const options = facade.makeOptions("GET", true);
    fetch(`https://kiah.dk/tomcat/Sem3Exam/api/user/all`, options)
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
          setMessage("No users found");
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((res) => {
        if (res) {
          setUsersInfo(res);
        }
      })
      .catch((err) => {
        setMessage("Error " + err);
      });
  };
  
  const handleHideUsers = () => {
    setShowTable(false);
  }

  return (
    <div>
      {!showTable && <button onClick={handleShowUsers}  className="btn">Show all users</button>}
      {showTable && (
        <>
         <button onClick={handleHideUsers} className="btn">Hide all users</button>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {usersInfo.map((user) => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <p>{message}</p>
    </div>
  );
};

export default UserDataAll;
