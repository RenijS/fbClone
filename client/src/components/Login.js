import React, { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (event) => {
    setLogData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: { ...logData },
      withCredentials: true,
      url: "http://localhost:9000/api/login",
    })
      .then((res) => {
        props.setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="loginContain">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div className="row">
          <div className="column">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleOnChange}
              value={logData.email}
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
              value={logData.password}
            />
          </div>
        </div>
        <div className="row">
          <button type="submit">Login</button>
          <button type="button">Clear</button>
        </div>
      </form>
    </div>
  );
}
