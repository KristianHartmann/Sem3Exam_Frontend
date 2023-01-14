import React, { useState, useEffect } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const searchObject = useSearchParams();
  console.log(searchObject);

  useEffect(() => {
    fetch("https://kiah.dk/tomcat/Sem3Exam/api/user/all")
      .then((res) => res.json())
      .then((data) => {
        setPersons(data);
      });
  }, []);

  return (
    <div>
      <nav>
        {persons.map((person) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/person/${person.userName}`}
            key={persons.userName}>
            {person.userName}
          </Link>
        ))}
        <Outlet></Outlet>
      </nav>
    </div>
  );
};

export default PersonList;