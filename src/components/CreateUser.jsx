import React, { useState } from "react";
import facade from "../apiFacade";
import { API_URL } from "../config";
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(null);
  const [job, setJob] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username.trim() === '' || password.trim() === '' || name.trim()==='' || job.trim()==='' || phone.trim()==='') {
      setError('All fields are required')
    } else {
      try {
        const options = facade.makeOptions("POST", true, {
          username: username,
          password: password,
          name: name,
          phone: phone,
          job: job,
          role: "user"
        });
        const res = await fetch(
          API_URL+'/tenant/create',
          options
        );
        const data = await res.json();
        if(data === 'created tenant') {
          setUsername('');
          setPassword('');
          setName('');
          setPhone('');
          setJob('');
          setError(null);
          setSuccess({ message: 'Tenant successfully created' });
        } else {
          setError('An error occured while creating the Tenant')
        }
      } catch (error) {
        setError('Tenant successfully created')
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
      <br />
      <label>
        name:
        <input className="input-field"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Phone nr:
        <input className="input-field"
          type="number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Job:
        <input className="input-field"
          type="text"
          value={job}
          onChange={e => setJob(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="btn">Create Tenant</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default CreateUser;
