import React, { useState } from 'react';
import facade from '../apiFacade';
import "../styles/main.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(facade.loggedIn());
  const [message, setMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    facade
      .login(username, password)
      .then((res) => {
        setIsLoggedIn(facade.loggedIn());
        window.location.reload();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setMessage(e.message));
        } else {
          setMessage("Network error");
        }
      });
  };

  const handleLogout = () => {
    facade.logout();
    setIsLoggedIn(false);
    setUsername("")
    setPassword("")
    window.location.reload();
  }

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <input className="input-field"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input className="input-field"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit" className="btn">Login</button>
          <div className="message">{message}</div>
        </form>
      ) : (
        <div>
          <button onClick={handleLogout} className="btn">Logout</button>
          <div className="message">{message}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
