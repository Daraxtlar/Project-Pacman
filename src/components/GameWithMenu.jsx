import React, { useState } from "react";
import Game from "./Game.jsx";
import Login from "./Login.jsx";
import Scores from "./Scores.jsx";
import "./Menu.css";
import "./Header.css";
import GameOver from "./GameOver.jsx";

function GameWithMenu({ setUsername }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [username, setLocalUsername] = useState("");
    const [password, setPassword] = useState("");
    const [scores, setScores] = useState([]);
    const [showGameOver, setShowGameOver] = useState(true);

    const openMenu = () => {
        setMenuOpen(true);
        setActiveMenu(null);
    };
    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            });
            const data = await res.json();
            alert(data.message);
            if (data.status === 'ok') {
                setUsername(username);
                setMenuOpen(false); // zamykamy menu po poprawnym loginie/rejestracji
            }
        } catch (err) {
            console.error(err);
            alert('Błąd połączenia z serwerem');
        }
    };
    const fetchScores = async () => {
        try {
            const res = await fetch('http://localhost:3001/scores');
            const data = await res.json();
            if (data.status === 'ok') {
                setScores(data.scores);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="position-relative main-div">
            <Game />

            {showGameOver && (
                <GameOver onPlayAgain={() => setShowGameOver(false)} />
            )}


            {(!menuOpen || activeMenu !== null) && (
                <button
                    className="buttons btn-open-menu"
                    onClick={openMenu}>
                    {activeMenu ? "Back To Menu" : "Menu"}
                </button>
            )}

            {menuOpen && (
                <div
                    className="d-flex flex-column justify-content-center align-items-center menu-open-div">
                    <h2 className="text-white mb-3">Pause Menu</h2>

                    {!activeMenu && (
                        <>
                            <button className="buttons" onClick={() => setActiveMenu("login")}>
                                Login
                            </button>
                            <button className="buttons" onClick={() => setMenuOpen(false)}>
                                Play
                            </button>
                            <button className="buttons" onClick={() => { setActiveMenu("scores"); fetchScores(); }}>
                                Scores
                            </button>
                        </>
                    )}

                    {activeMenu === "login" && (
                        // <Login onBack={() => setActiveMenu(null)} />
                        <Login
                            onBack={() => setActiveMenu(null)}
                            setUsername={setUsername}
                            closeMenu={() => setMenuOpen(false)}
                        />

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
