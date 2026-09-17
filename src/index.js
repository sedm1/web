import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('X-Author', 'zefirnaya');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/login', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.send('zefirnaya');
});

app.get('/sample/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.send('function task(x){ return x * this ** 2; }');
});

app.listen(3000);
