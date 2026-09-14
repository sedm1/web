import express from 'express';

const app = express();

app.get('/', (req, res) => {
    const user = req.query.user || '';
    res.send(`<h1>Привет, ${user}!</h1>`);
});

app.get('/login', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.listen(3000);
