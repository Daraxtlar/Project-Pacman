import React, { useState } from "react";
import Game from "./Game.jsx";
import './Menu.css'
function GameWithMenu({ setUsername }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [username, setLocalUsername] = useState("");
    const [password, setPassword] = useState("");
    const [scores, setScores] = useState([]);

    const openMenu = () => {
        setMenuOpen(true);
        setActiveMenu(null);
    };
    /*
    const handleLogin = () => {
        console.log("Logowanie:", username, password);
    };*/
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
                            <button className="buttons" onClick={() => setActiveMenu("login")}>Login</button>
                            <button className="buttons" onClick={() => setMenuOpen(false)}>Play</button>
                            <button className="buttons" onClick={() => { setActiveMenu("scores"); fetchScores(); }}>Scores</button>
                        </>
                    )}

                    {activeMenu === "login" && (
                        <div className="text-white w-50">
                            <input
                                type="text"
                                placeholder="Username"
                                className="form-control mb-2 inputPass"
                                value={username}
                                onChange={e => setLocalUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control mb-2 inputPass"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button className="buttons" onClick={handleLogin}>Log in</button>
                        </div>
                    )}

                    {activeMenu === "scores" && (
                        <div  id={"scores"}>
                            <h3 className="mb-3">🏆 Best Scores</h3>
                            <ul className="list-unstyled">
                                {scores.map((s, index) => (
                                    <li key={index}>
                                        {index + 1}. {s.login} – {s.score} pts
                                    </li>
                                ))}

                            </ul>
                        </div>



                    )}
                </div>
            )}
        </div>
    );
}

export default GameWithMenu;
