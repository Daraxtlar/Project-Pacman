import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import "./pacman.css"

function Header({username }) {
    return (
        <Navbar style={{ backgroundColor: '#000033', borderBottom: '4px solid #FFA500' }} variant="dark" expand="lg">
            <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <div style={{ color: '#fff', fontSize: '1.2rem' }}>
                    <div style={{ backgroundColor: 'black',padding: '20px', fontSize: '1.2rem', borderRadius:"2%" }}>
                        <span className="me-4">Score: 0</span><br/>
                        <span>Lives: 3</span>
                    </div>

                </div>

                <Navbar.Brand as={Link} to="/" style={{ fontSize: '2rem', color: '#FFA500', fontWeight: 'bold', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="pacman">
                        <div className="dot"></div><div className="point"></div>
                    </div> PACMAN
                </Navbar.Brand>

                <div style={{ color: '#fff', fontSize: '1.2rem' }}>
                    <div style={{ backgroundColor: 'black',padding: '20px', fontSize: '1.2rem', borderRadius:"2%" }}>
                        Player: {username || "Guest"}

                    </div>
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;