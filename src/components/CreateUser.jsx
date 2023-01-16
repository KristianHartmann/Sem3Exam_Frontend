import React, { useState } from "react";
import facade from "../apiFacade";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username.trim() === '' || password.trim() === '') {
      setError('Both fields are required')
    } else {
      try {
        const options = facade.makeOptions("POST", true, {
          username: username,
          password: password,
          role: "user"
        });
        const res = await fetch(
          'https://kiah.dk/tomcat/Sem3Exam/api/user/create',
          options
        );
        const data = await res.json();
        if(data.success) {
          setUsername('');
          setPassword('');
          setError(null);
          setSuccess('User successfully created');
        } else {
          setError('An error occured while creating the user')
        }
      } catch (error) {
        setError('An error occured while creating the user')
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input className="input-field"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input className="input-field"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="btn">Create User</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default CreateUser;
