import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import LogIn from "./components/Login";
import LoggedIn from "./components/LoggedIn";

function App() {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
export default App;
