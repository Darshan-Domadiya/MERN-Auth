import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.post("/api/user/v1/signin", {
        email,
        password,
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsError(false);
        console.log("User logged in successfully!", response);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
      console.log("ERROR while sign in!", error);
    }
  };

  return (
    <Container className="mt-5 d-flex align-items-center flex-column justify-content-center">
      <h2>Sign In</h2>
      <Form
        onSubmit={handleSignIn}
        className="w-100 d-flex flex-column align-items-center justify-content-center  "
      >
        <Form.Group className="mt-3 w-50 ">
          <Form.Control
            className="p-3 user-input  bg-body-secondary"
            type="email"
            placeholder=" Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mt-3 w-50">
          <Form.Control
            className="p-3 user-input bg-body-secondary"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button className="w-50 mt-3 p-3" variant="dark" type="submit">
          {isLoading ? <Spinner /> : "SIGN IN"}
        </Button>
        <Button className="mt-2 w-50  p-3" variant="danger" type="submit">
          CONTINUE WITH GOOGLE
        </Button>
        <div className="text-start w-50 mt-2">
          Don&apos;t Have an Account?{" "}
          <b className="pointer" onClick={handleSignUpClick}>
            Sign Up
          </b>
        </div>
      </Form>
      <p className="text-danger">{isError ? errorMessage : ""}</p>
    </Container>
  );
};

export default SignIn;
