import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: 'pg-18cdd7c4-abalut-e272.e.aivencloud.com',
    database: 'pacman',
    user: 'avnadmin',
    password: 'podmien',
    port: 14527,
    ssl: { rejectUnauthorized: false }
});

app.post('/login', async (req, res) => {
    let { username, password } = req.body;

    username = username.toLowerCase();

    try {
        const result = await pool.query('SELECT * FROM pacman.users WHERE username=$1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            //const match = await bcrypt.compare(password, user.password);
            if (password === user.password) {
                res.json({ status: 'ok', message: 'Zalogowano' });
            } else {
                res.json({ status: 'error', message: 'Niepoprawne hasło' });
            }
        } else {
            //const hashed = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO pacman.users(username, password) VALUES($1, $2)', [username, password]);
            res.json({ status: 'ok', message: 'Konto utworzone' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Błąd serwera' });
    }
});
app.get('/scores', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT login, score, date FROM pacman.scores ORDER BY score DESC LIMIT 10'
        );
        res.json({ status: 'ok', scores: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Błąd serwera' });
    }
});
app.get('/scores/:username', async (req, res) => {
    const username = req.params.username.toLowerCase(); 

    try {
        const result = await pool.query(
            'SELECT score, date FROM pacman.scores WHERE login=$1 ORDER BY score DESC LIMIT 1',
            [username]
        );
        if (result.rows.length > 0) {
            res.json({ status: 'ok', score: result.rows[0] });
        } else {
            res.json({ status: 'ok', score: null });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Błąd serwera' });
    }
});

app.post('/scores', async (req, res) => {
    const { login, score } = req.body;

    try {
        
        const result = await pool.query(
            'INSERT INTO pacman.scores (login, score) VALUES ($1, $2) RETURNING *',
            [login.toLowerCase(), score]
        );
        res.json({ status: 'ok', score: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Błąd serwera' });
    }
});


app.listen(3001, () => console.log('Server running on port 3001'));
