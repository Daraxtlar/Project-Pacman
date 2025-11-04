import React from "react";
import "./Menu.css"

function Game() {
    const saveScore = async (score) => {
        try {
            const res = await fetch('http://localhost:3001/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: username, score })
            });
            const data = await res.json();
            if (data.status === 'ok') {
                alert(`Wynik zapisany: ${data.score.score} pkt`);
            }
        } catch (err) {
            console.error(err);
            alert('Nie udało się zapisać wyniku');
        }
    };

    return (
        <div>
            <div className={"scores-lives"}>
                <span>Score: 0</span><br/>
                <span>Lives: 3</span>
            </div>
            <p>🎮 Tu pojawi się gra Pac-Man!</p>
        </div>
        //saveScore(currentScore);
    );
}

export default Game;
