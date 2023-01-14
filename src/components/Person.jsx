import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Person = (props) => {
  const { personName } = useParams();
  const navigate = useNavigate();

  console.log(personName);
  return (
    <div>
      Person with name: {personName}
      <br />
      <button onClick={() => navigate("/")}>HOME</button>
    </div>
  );
};
export default Person;
