import React, { useState } from "react";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Logowanie:", username, password);
    };

    return (
        <div className="text-white w-50">
            <input
                type="text"
                placeholder="Username"
                className="form-control mb-2 inputPass"
                value={username}
                onChange={e => setUsername(e.target.value)}
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
