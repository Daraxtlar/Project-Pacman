import React, { useState, useEffect } from "react";
import Scores from "./Scores.jsx";
import "./GameOver.css";

const LETTERS = "GAME OVER".split("");

function GameOver({ onPlayAgain }) {
    const [eatenLetters, setEatenLetters] = useState([]);
    const [showPacman, setShowPacman] = useState(false);
    const [showPacmanDeathAnimation, setShowPacmanDeathAnimation] = useState(false);

    useEffect(() => {
        setShowPacmanDeathAnimation(true);
        const timer = setTimeout(() => {
            setShowPacmanDeathAnimation(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handlePlayAgain = () => {
        setEatenLetters([]);
        setShowPacman(true);

        let idx = -1;
        const len = LETTERS.length;

        const interval = setInterval(() => {
            while (idx < len && LETTERS[idx + 1] === " ") {
                idx++;
            }

            if (idx >= len) {
                clearInterval(interval);
                return;
            }

            setEatenLetters((prev) => [...prev, idx]);
            idx++;

            if (idx >= len) {
                clearInterval(interval);
            }
        }, 200);

        const totalDuration = len * 200 + 400;
        setTimeout(() => {
            setShowPacman(false);
            if (typeof onPlayAgain === "function") onPlayAgain();
        }, totalDuration);
    };

    return (
        <div id="frontLayout">

            {showPacmanDeathAnimation && (
                <div className="shape"></div>
            )}
            {!showPacmanDeathAnimation&&(
                <>
                    <div id="GameOver">
                        {showPacman && (
                            <div className="pacmanAnim">
                                <div className={"pacmanAnimEye"}></div>
                            </div>
                        )}

                        {LETTERS.map((char, i) => (
                            <span
                                key={i}
                                className={`letter ${eatenLetters.includes(i) ? "eaten" : ""}`}
                                aria-hidden={char === " " ? "true" : "false"}>
                        {char}
                    </span>
                        ))}
                    </div>
                    <div>
                        <p>Twój wynik : 000000</p>
                    </div>
                    <Scores />

                    <button id="AgainBT" onClick={handlePlayAgain}>
                        Play Again
                    </button>
                </>

            )}
        </div>
    );
}

export default GameOver;
