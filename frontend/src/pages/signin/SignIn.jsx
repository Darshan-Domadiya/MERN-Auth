import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import OAuth from "../../components/oauth/OAuth";
import SpinnerCom from "../../components/Spinner";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);

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
      dispatch(signInStart());

      const response = await axios.post("/api/user/v1/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(signInSuccess(response.data.user));
        console.log("User logged in successfully!", response);
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error));
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
            autoComplete="off"
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
          {isLoading ? <SpinnerCom /> : "SIGN IN"}
        </Button>
        <OAuth />
        <div className="text-start w-50 mt-2">
          Don&apos;t Have an Account?{" "}
          <b className="pointer" onClick={handleSignUpClick}>
            Sign Up
          </b>
        </div>
      </Form>
      <p className="text-danger">
        {isError
          ? isError.response?.data?.message || "Something went wrong!"
          : ""}
      </p>
    </Container>
  );
};

export default SignIn;
