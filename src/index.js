import express from 'express';

const app = express();

app.get('/1', (req, res) => {
    res.set('X-Author', 'zefirnaya')
    res.set('Access-Control-Allow-Origin', '*')
    res.send('zefirnaya');
});

app.listen(3000);
