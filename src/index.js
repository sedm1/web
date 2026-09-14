import express from 'express';

const app = express();

app.enable('strict routing');

app.get('/login/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('zefirnaya');
});

app.get('/sample/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end('function task(x) { return x * this ** 2; }');
});

app.listen(3000);
