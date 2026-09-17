import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.setHeader('X-Author', 'zefirnaya');
    res.type('text/plain').send('zefirnaya');
});

app.listen(3000);
