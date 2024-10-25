import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./signup.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../../components/oauth/OAuth";
import SpinnerCom from "../../components/Spinner";

const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.post("/api/user/v1/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setIsLoading(false);
        setIsError(false);
        navigate("/signin");
        console.log("User created!", response);
      }
    } catch (error) {
      setIsError(true);

      console.log("ERROR while signup", error);
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex align-items-center flex-column justify-content-center">
      <h2>Sign Up</h2>
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} xl={4} className="mx-auto">
          <Form
            onSubmit={handleFormSubmit}
            className="d-flex flex-column align-items-center justify-content-center  "
          >
            <Form.Group className="mt-3 w-100">
              <Form.Control
                className="p-3 user-input bg-body-secondary"
                type="text"
                placeholder=" Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mt-3 w-100 ">
              <Form.Control
                className="p-3 user-input  bg-body-secondary"
                type="email"
                placeholder=" Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mt-3 w-100">
              <Form.Control
                className="p-3 user-input bg-body-secondary"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button className="w-100 mt-3 p-3" variant="dark" type="submit">
              {isLoading ? <SpinnerCom /> : "SIGN UP"}
            </Button>
            <OAuth />
            <div className="text-start w-100 mt-2">
              Have an Account?{" "}
              <b className="pointer" onClick={handleSignInClick}>
                Sign In
              </b>
            </div>
            <p className="text-danger text-start">
              {isError ? "Something went wrong!!" : ""}
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
