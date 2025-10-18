import React, { useState } from "react";
import Game from "./Game.jsx";
import './Menu.css';

function GameWithMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const openMenu = () => {
        setMenuOpen(true);
        setActiveMenu(null);
    };

    const handleLogin = () => {
        console.log("Logowanie:", username, password);
    };

    return (
        <div className="game-container">
            <Game />

            {(!menuOpen || activeMenu !== null) && (
                <button className="buttons menu-toggle-button" onClick={openMenu}>
                    {activeMenu ? "Back To Menu" : "Menu"}
                </button>
            )}

            {menuOpen && (
                <div className="menu-overlay">
                    <h2 className="menu-title">Pause Menu</h2>

                    {!activeMenu && (
                        <div className="menu-buttons">
                            <button className="buttons" onClick={() => setActiveMenu("login")}>Login</button>
                            <button className="buttons" onClick={() => setMenuOpen(false)}>Play</button>
                            <button className="buttons" onClick={() => setActiveMenu("scores")}>Scores</button>
                        </div>
                    )}

                    {activeMenu === "login" && (
                        <div className="login-form">
                            <input
                                type="text"
                                placeholder="Username"
                                className="form-control inputPass"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control inputPass"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button className="buttons" onClick={handleLogin}>Log in</button>
                        </div>
                    )}

                    {activeMenu === "scores" && (
                        <div id="scores">
                            <h3 className="mb-3">🏆 Best Scores</h3>
                            <ul className="list-unstyled"></ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default GameWithMenu;
