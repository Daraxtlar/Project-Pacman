import React, { useState } from "react";
import Game from "./Game.jsx";
import Login from "./Login.jsx";
import Scores from "./Scores.jsx";
import "./menu.css";

function GameWithMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const openMenu = () => {
        setMenuOpen(true);
        setActiveMenu(null);
    };

    return (
        <div
            className="position-relative"
            style={{
                width: "1024px",
                height: "720px",
                backgroundColor: "black",
                overflow: "hidden",
            }}
        >
            <Game />

            {(!menuOpen || activeMenu !== null) && (
                <button
                    className="buttons"
                    onClick={openMenu}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        zIndex: 20,
                    }}
                >
                    {activeMenu ? "Back To Menu" : "Menu"}
                </button>
            )}

            {menuOpen && (
                <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "1024px",
                        height: "720px",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        zIndex: 10,
                        padding: "2rem",
                    }}
                >
                    <h2 className="text-white mb-3">Pause Menu</h2>

                    {!activeMenu && (
                        <>
                            <button className="buttons" onClick={() => setActiveMenu("login")}>
                                Login
                            </button>
                            <button className="buttons" onClick={() => setMenuOpen(false)}>
                                Play
                            </button>
                            <button className="buttons" onClick={() => setActiveMenu("scores")}>
                                Scores
                            </button>
                        </>
                    )}

                    {activeMenu === "login" && (
                        <Login onBack={() => setActiveMenu(null)} />
                    )}

                    {activeMenu === "scores" && (
                        <Scores onBack={() => setActiveMenu(null)} />
                    )}
                </div>
            )}
        </div>
    );
}

export default GameWithMenu;
