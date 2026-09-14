import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/login', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.get('/id/:N', async (req, res) => {
    try {
        const response = await fetch(`https://nd.kodaktor.ru/users/${req.params.N}`);

        if (!response.ok) {
            return res.status(response.status).type('text/plain').send('error');
        }

        const data = await response.json();

        res.type('text/plain').send(data.login);
    } catch (error) {
        res.status(500).type('text/plain').send('error');
    }
});


app.listen(3000);
