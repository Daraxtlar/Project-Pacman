import React, {useState, useEffect} from "react";
import "./Menu.css"
import "./Tilemap.css"

function Game() {

    const [getTilemap, setTilemap] = useState([[{}]]);
    const tilemapSize = { x: 21, y: 17, pixelsInTile: 32 };

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

    const generateTilemap = () => {
        let createdTilemap = [];
        for (let j = 0; j < tilemapSize.y; j++) {
            createdTilemap[j] = [];
            for (let i = 0; i < tilemapSize.x; i++) {
                createdTilemap[j][i] = { collision: false };
            }
        }
        setTilemap(createdTilemap);
    }

    useEffect(() => {
        generateTilemap();
    }, []);

    return (
        <div>
            <div className={"scores-lives"}>
                <span>Score: 0</span><br/>
                <span>Lives: 3</span>
            </div>
            <table className="tilemap">
                {getTilemap.map((tileRow, y) => {
                    return (
                    <tr className="tilerow" key={y}>
                        {tileRow.map((tile, x) => {
                            return (
                            <td className="tile" key={x}></td>
                            )
                        })}
                    </tr>
                    )
                })}
            </table>
        </div>
        //saveScore(currentScore);
    );
}

export default Game;
