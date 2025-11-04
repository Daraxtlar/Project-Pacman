import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import "./pacman.css"
import "./Header.css"

function Header({username}) {
    return (
        <Navbar className={"header-navbar"} variant="dark" expand="lg">
            <Container className={"header-container"}>

                <div className={"header-box"}></div>

                <Navbar.Brand as={Link} to="/" className={"header-brand"}>

                    <div className="pacman">
                        <div className="dot"></div><div className="point"></div>
                    </div>

                    PACMAN

                </Navbar.Brand>

                <div className={"header-box"}>
                    <div className={"header-info"}>
                        Player: {username || "Guest"}
                    </div>
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;