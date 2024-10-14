import React from "react";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleProfileImageClick = () => {
    navigate("/profile");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand href="/">Auth App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>

            {currentUser ? (
              <Image
                src={currentUser.profileImage}
                alt="profle"
                width="35px"
                height="35px"
                className="object-fit-cover rounded-5 mt-1 mx-1"
                onClick={handleProfileImageClick}
              />
            ) : (
              <Nav.Link href="/signin">Sign In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
