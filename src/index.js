import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.set('X-Author', 'zefirnaya');
    res.set('Access-Control-Allow-Origin', '*');
    res.type('text/plain').send('zefirnaya');
});

app.get('/login', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.listen(3000);
