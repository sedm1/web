import express from 'express';

const app = express();

app.get('/id/:N', async (req, res) => {
    try {
        const response = await fetch(`https://nd.kodaktor.ru/users/${req.params.N}`);

        if (!response.ok) {
            return res.status(response.status).send('Ошибка внешнего сервиса');
        }

        const data = await response.json();

        res.type('text/plain').send(data.login);
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
});

app.get('/login', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.listen(3000);
