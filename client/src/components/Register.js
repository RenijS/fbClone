import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

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
    <div className="d-flex justify-content-center mt-5">
      <Form
        onSubmit={registerUser}
        className="w-75 d-flex flex-column border p-4 shadow rounded"
      >
        <h1 className="fw-bold">Sign Up</h1>
        <span>It's quick and easy</span>
        <hr />
        <Form.Group className="mb-3 d-flex gap-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="First name"
            className="fs-5"
            onChange={handleOnChange}
            value={regData.firstName}
          />
          <Form.Control
            type="text"
            placeholder="Last name"
            className="fs-5"
            onChange={handleOnChange}
            value={regData.lastName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="fs-5"
            onChange={handleOnChange}
            value={regData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            className="fs-5"
            onChange={handleOnChange}
            value={regData.password}
          />
        </Form.Group>
        <Button variant="success" type="button" className="fs-4 fw-bold mt-2">
          Sign up
        </Button>
        <hr />
        <a href="/login">
          <Button variant="primary" type="submit" className="fs-4 fw-bold">
            Already got account?
          </Button>
        </a>
      </Form>
    </div>
  );
}
