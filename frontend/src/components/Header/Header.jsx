import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/SSTLOGO.png";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const closeOffcanvas = () => setShowOffcanvas(false);

  const handleNavClick = (nav, action) => {
    setActiveNav(nav);
    closeOffcanvas();
    action();
  };

  useEffect(() => {
    const stickyHeaderFunc = () => {
      const navbar = document.querySelector(".shadow-sm");
      if (window.scrollY > 80) {
        navbar.classList.add("sticky__header");
      } else {
        navbar.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", stickyHeaderFunc);
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm sticky-top sticky__header">
      <Container>
        {/* Left Side: Logo */}
        <Navbar.Brand
          onClick={() => handleNavClick("home", () => navigate("/"))}
        >
          <img
            src={logo}
            alt="Logo"
            width="200"
            className="d-inline-block align-top logo"
          />
        </Navbar.Brand>

        {/* Right Side: Navlist */}
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={toggleOffcanvas}
        />
        <Navbar.Collapse className="justify-content-end d-none d-lg-flex">
          <Nav>
            <Nav.Link
              onClick={() => handleNavClick("home", () => navigate("/"))}
              className={`fw-bold ${activeNav === "home" ? "active" : ""}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavClick("tour", () => navigate("/tours"))}
              className={`fw-bold ${activeNav === "tour" ? "active" : ""}`}
            >
              Tour
            </Nav.Link>
            <Button
              variant="outline-primary"
              className="me-2 ms-4"
              onClick={() => handleNavClick("login", () => navigate("/login"))}
            >
              Login
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                handleNavClick("register", () => navigate("/register"))
              }
            >
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>

        {/* Offcanvas for Mobile View */}
        <Offcanvas
          show={showOffcanvas}
          onHide={closeOffcanvas}
          placement="end"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav.Link
                onClick={() =>
                  handleNavClick("home", () => {
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
                    navigate("/");
                  })
                }
                className={activeNav === "home" ? "active" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() =>
                  handleNavClick("tour", () => {
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
                    navigate("/tours");
                  })
                }
                className={activeNav === "tour" ? "active" : ""}
              >
                Tour
              </Nav.Link>
              <Button
                variant="outline-primary"
                className="me-2 mt-2"
                onClick={() =>
                  handleNavClick("login", () =>{
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/login")} )
                }
              >
                Login
              </Button>
              <Button
                variant="primary"
                className="mt-2"
                onClick={() =>
                  handleNavClick("register", () =>{
                    navigate("/register")}
                   )
                }
              >
                Register
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
