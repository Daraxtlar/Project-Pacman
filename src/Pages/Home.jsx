import React from "react";
import GameWithMenu from "../components/GameWithMenu.jsx";

function Home({ setUsername }) {
    return (
        <div style={{ backgroundColor: 'black', color:"white",textAlign:"center",width:"1024px",height:"720px"}}>
            <GameWithMenu setUsername={setUsername} />
        </div>

    );
}


export default Home;
