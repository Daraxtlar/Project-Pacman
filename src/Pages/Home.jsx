import React from "react";
import GameWithMenu from "../components/GameWithMenu.jsx";
import "./Home.css"

function Home({ setUsername }) {
    return (
        <div className={"home-style"}>
            <GameWithMenu setUsername={setUsername} />
        </div>

    );
}


export default Home;
