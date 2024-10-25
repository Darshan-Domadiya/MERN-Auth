import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center flex-column mt-5"
    >
      <Row className="w-100">
        <Col xs={12} md={8} lg={8} xl={6} className="mx-auto">
          <div className="text-black-50 mb-4 text-center">
            <h2>Welcome to MERN Authentication</h2>
          </div>

          <div className="fw-medium">
            <p>
              This is a full-stack web application built with the MERN (MongoDB,
              Express, React, Node.js) stack. It includes authentication
              features that allow users to sign up, log in, and log out, and
              provides access to protected routes only for authenticated users.
            </p>
            <p>
              The front-end of the application is built with React and uses
              React Router for client-side routing. The back-end is built with
              Node.js and Express, and uses MongoDB as the database.
              Authentication is implemented using JSON Web Tokens (JWT).
            </p>

            <p>
              This application is intended as a starting point for building
              full-stack web applications with authentication using the MERN
              stack.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
