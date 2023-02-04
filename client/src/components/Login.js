import React, { useState } from "react";

export default function Login() {
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
    const response = await fetch("http://localhost:9000/api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...logData }),
    });

    const data = await response.json();
    if (data.user) {
      console.log("Login successful");
    } else {
      console.log("Login unsuccessful");
    }
  };

  return (
    <div className="loginContain">
      <h1>Login</h1>
      <form onSubmit={""}>
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
          <button type="submit">Register</button>
          <button type="button">Clear</button>
        </div>
      </form>
    </div>
  );
}
