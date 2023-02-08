import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

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
    <div className="d-flex flex-column flex-lg-row align-items-center mt-5">
      <div className="text-center">
        <h1 className="text-primary fw-bold fs-0">facebook</h1>
        <p className="fs-4 w-75 mx-auto">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <Form
        onSubmit={loginUser}
        className="w-75 d-flex flex-column border p-4 shadow rounded"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="fs-5"
            onChange={handleOnChange}
            value={logData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            className="fs-5"
            onChange={handleOnChange}
            value={logData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="fs-4 fw-bold">
          Log in
        </Button>
        <a className="mx-auto mt-3 mb-2">Forgotten password?</a>
        <hr />
        <Button variant="success" type="button" className="fs-4 fw-bold mt-2">
          Create new account
        </Button>
      </Form>
    </div>
  );
}
