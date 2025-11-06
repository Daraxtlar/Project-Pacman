import React, {useState} from "react";
function ScoresPage() {
    const [scores, setScores] = useState([]);

    const fetchScores = async () => {
        try {
            const res = await fetch('http://localhost:3001/scores');
            const data = await res.json();
            if (data.status === 'ok') {
                setScores(data.scores);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div  id={"scores"}>
            <h3 className="mb-3">🏆 Best Scores</h3>
            <ul className="list-unstyled">
                {scores.map((s, index) => (
                    <li key={index}>
                        {index + 1}. {s.login} – {s.score} pts
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default ScoresPage;
