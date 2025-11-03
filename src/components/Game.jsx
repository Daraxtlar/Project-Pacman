import React from "react";
import "./Menu.css"

function Game() {
    return (
        <div>
            <div className={"scores-lives"}>
                <span>Score: 0</span><br/>
                <span>Lives: 3</span>
            </div>
            <p>🎮 Tu pojawi się gra Pac-Man!</p>
        </div>
    );
}

export default Game;
