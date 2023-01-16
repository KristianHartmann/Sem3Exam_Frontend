import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h3>HomePage</h3>
      <Outlet></Outlet>
    </div>
  );
};
export default Home;
