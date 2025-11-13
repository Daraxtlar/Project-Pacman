import React, {useState, useEffect} from "react";
import "./Menu.css"
import "./Tilemap.css"

function Game() {

    const tilemapSize = { x: 21, y: 17, tileSize: 32 };
    const [tilemap, setTilemap] = useState([]);
    const [floatingTile, setFloatingTile] = useState({x: 10*tilemapSize.tileSize, y: 9*tilemapSize.tileSize});
    const [debugState, setDebug] = useState(false);
    const [playerPos, setPlayerPos] = useState({ x: 10, y: 9 });

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
        const wallPositions = [
            {x: 10, y: 1}, {x: 10, y: 2},
            {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2}, {x: 1, y: 4}, {x: 2, y: 4},
            {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}, {x: 8, y: 4},
            {x: 10, y: 4},
            {x: 6, y: 5}, {x: 6, y: 6},
            {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6},
            {x: 2, y: 8}, {x: 3, y: 8}, {x: 4, y: 8}, {x: 2, y: 9}, {x: 3, y: 9}, {x: 4, y: 9}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10},
            {x: 6, y: 8}, {x: 6, y: 9}, {x: 6, y: 10},
            {x: 2, y: 12}, {x: 3, y: 12}, {x: 4, y: 12}, {x: 4, y: 13}, {x: 4, y: 14}, {x: 2, y: 14},
            {x: 6, y: 12}, {x: 7, y: 12}, {x: 8, y: 12}, {x: 6, y: 13}, {x: 6, y: 14},
            {x: 8, y: 14}, {x: 9, y: 14}, {x: 10, y: 14},
            {x: 10, y: 12}, {x: 10, y: 11}, {x: 8, y: 10}, {x: 9, y: 10}, {x: 10, y: 10},
            {x: 9, y: 6}, {x: 8, y: 6}, {x: 8, y: 7}, {x: 8, y: 8}, {x: 9, y: 8}, {x: 10, y: 8},
        ];
        let createdTilemap = [];

        for (let j = 0; j < tilemapSize.y; j++) {
            createdTilemap[j] = [];
            for (let i = 0; i < tilemapSize.x; i++) {
                createdTilemap[j][i] = {
                    wall: (
                        wallPositions.some(wall =>
                            ( (wall.x === i || wall.x === tilemapSize.x-i-1 ) && wall.y === j)
                        ) ||
                        (i === 0 || i === tilemapSize.x-1) ||
                        (j === 0 || j === tilemapSize.y-1)
                    )
                };
            }
        }

        setTilemap(createdTilemap);
    }

    useEffect(() => {
        generateTilemap();
    }, []);


    window.debug = (showDebugs = null) => {
        setDebug( showDebugs===null ? (!debugState) : showDebugs );
    }
    window.setFTilePosInPx = (X = 0, Y = 0) => {
        let currentFloatingTile = {x: X, y: Y};
        setFloatingTile(currentFloatingTile);
        console.log(floatingTile);
        console.log(currentFloatingTile);
    }
    window.setFTilePosInTiles = (X = 0, Y = 0) => {
        let currentFloatingTile = {x: X * tilemapSize.tileSize, y: Y * tilemapSize.tileSize};
        setFloatingTile(currentFloatingTile);
        console.log(floatingTile);
        console.log(currentFloatingTile);
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            let dx = 0, dy = 0;

            if (e.key === "w" || e.key === "ArrowUp") dy = -1;
            else if (e.key === "s" || e.key === "ArrowDown") dy = 1;
            else if (e.key === "a" || e.key === "ArrowLeft") dx = -1;
            else if (e.key === "d" || e.key === "ArrowRight") dx = 1;
            else return;

            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;

            if (
                newY >= 0 && newY < tilemapSize.y &&
                newX >= 0 && newX < tilemapSize.x &&
                !tilemap[newY][newX].wall
            ) {
                setPlayerPos({ x: newX, y: newY });
                setFloatingTile({
                    x: newX * tilemapSize.tileSize,
                    y: newY * tilemapSize.tileSize
                });
            } else {
                console.log("Kolizja!");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [playerPos, tilemap]);


    return (
        <div>
            <div className={"scores-lives"}>
                <span>Score: 0</span><br/>
                <span>Lives: 3</span>
            </div>
            <div className="level-container">
                <table className="tilemap">
                    <tbody>
                    {tilemap.map((tileRow, y) => {
                        return (
                            <tr className="tilerow" key={y}>
                                {tileRow.map((tile, x) => {
                                    return (
                                        <td className="tile" key={x}
                                            style={ debugState && tile.wall ? {backgroundColor: "rgba(255,255,0,30%)"} : {} }
                                        ></td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className="floating-tile"
                     style={{
                         // backgroundColor: debugState ? "rgba(0,255,0,30%)" : "",
                         border: debugState ? "1px rgb(0,255,0) solid" : "",
                         top: floatingTile.y,
                         left: floatingTile.x
                     }}
                ></div>
            </div>
        </div>
        //saveScore(currentScore);
    );
}

export default Game;
