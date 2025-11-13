import React, { useState } from "react";

function LoginPage({ setUsername, closeMenu }) {
    const [username, setLocalUsername] = useState("");
    const [password, setPassword] = useState("");

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
                closeMenu(); // zamykamy menu po poprawnym loginie/rejestracji
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
    );
}

export default LoginPage;