import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center flex-column w-50 mt-5">
      <div className="text-black-50 mb-4">
        <h2>About</h2>
      </div>

      <div className="fw-medium">
        <p>
          This is a MERN (MongoDB, Express, React, Node.js) stack application
          with authentication. It allows users to sign up, log in, and log out,
          and provides access to protected routes only for authenticated users.
        </p>
        <p>
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is
          implemented using JSON Web Tokens (JWT).
        </p>

        <p>
          This application is intended as a starting point for building
          full-stack web applications with authentication using the MERN stack.
        </p>
      </div>
    </Container>
  );
};

export default About;
