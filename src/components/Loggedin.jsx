import { useEffect, useState } from "react";
import React from "react";

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    fetch("https://kiah.dk/tomcat/Sem3Exam/api/user/all")
    .then(response => response.json())
    .then(data => setDataFromServer(data))
    .catch(error => console.log(error));
}, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

export default LoggedIn;
