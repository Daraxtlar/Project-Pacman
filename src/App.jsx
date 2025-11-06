import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import AppNavbar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const [username, setUsername] = useState("");

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 ">
                <AppNavbar  username={username} />
                <main className="flex-grow-1 d-flex justify-content-center align-items-center">
                        <Home setUsername={setUsername} />
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
