import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleOnChange = (event) => {
    setRegData((prevData) => {
      return {
        ...prevData,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: { ...regData },
      withCredentials: true,
      url: "http://localhost:9000/api/register",
    }).then((res) => console.log(res));
  };

  return (
    <div className="registerContain">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <div className="row">
          <div className="column">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleOnChange}
              value={regData.firstName}
            />
          </div>
          <div className="column">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleOnChange}
              value={regData.lastName}
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleOnChange}
              value={regData.email}
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleOnChange}
              value={regData.password}
            />
          </div>
        </div>
        <div className="row">
          <button type="submit">Register</button>
          <button type="button">Clear</button>
        </div>
      </form>
    </div>
  );
}
