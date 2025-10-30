import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import "./pacman.css"
import "./Header.css"

function Header() {
    return (
        <Navbar className={"header-navbar"} variant="dark" expand="lg">
            <Container className={"header-container"}>

                <div className={"header-box"}>
                    <div className={"header-info"}>
                        <span className="me-4">Score: 0</span><br/>
                        <span>Lives: 3</span>
                    </div>

                </div>

                <Navbar.Brand as={Link} to="/" className={"header-brand"}>
                    <div className="pacman">
                        <div className="dot"></div><div className="point"></div>
                    </div> PACMAN
                </Navbar.Brand>

                <div className={"header-box"}>
                    <div className={"header-info"}>
                        Player: __username__
                    </div>
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;