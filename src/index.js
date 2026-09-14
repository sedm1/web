import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/140926', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.get('/add/:x1/:x2', (req, res) => {
    const result = Number(req.params.x1) + Number(req.params.x2);
    res.type('text/plain').send(String(result));
});

app.get('/mpy/:y1/:y2', (req, res) => {
    const result = Number(req.params.y1) * Number(req.params.y2);
    res.type('text/plain').send(String(result));
});


app.listen(3000);
