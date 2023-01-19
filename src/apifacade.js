import { API_URL } from './config';

const URL = API_URL;
import jwtDecode from 'jwt-decode';

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}



const unpackToken = () => {
  const token = getToken();
  if (token) {
      try {
          const decoded = jwtDecode(token);
          const exp = decoded.exp;
          if (exp < Date.now() / 1000) {
              // token expired
              return false;
          }
          else if (decoded.role === 'admin') {
              return true;
          }
          else {
              return false;
          }
      } catch (e) {
          // invalid token
          return false;
      }
  }
  else {
      return false;
  }
}
function getUserName() {
  return localStorage.getItem("username");
}
function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchData = () => {
    /TODO/;
  };
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    getUserName,
    unpackToken,
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
  };
}
const facade = apiFacade();

export default facade;
