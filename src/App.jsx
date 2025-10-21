import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AppNavbar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {


    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 ">
                <AppNavbar />
                <main className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
