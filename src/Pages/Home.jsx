import React from "react";
import GameWithMenu from "../components/GameWithMenu.jsx";

function Home() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                color: "white",
                width: "100%",
                height: "720px",
                marginTop:"50px"
            }}
        >
            <GameWithMenu />
        </div>
    );
}

export default Home;
