import React from "react";
import "./footer.scss";
import Container from "react-bootstrap/esm/Container";

const Footer = () => {
  return (
    <Container fluid className="footer bg-body-secondary text-center ">
      &copy;2024 All Rights Reserved
    </Container>
  );
};

export default Footer;
