import express from 'express';
import mongodb from 'mongodb';

const { MongoClient } = mongodb;

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.urlencoded({ extended: false }));

app.get('/login/', (req, res) => {
    res.send('zefirnaya');
});

app.post('/insert/', async (req, res) => {
    const { login, password, URL } = req.body;

    const client = await (new MongoClient(URL)).connect();

    await client.db().collection('users').insertOne({
        login,
        password
    });

    await client.close();

    res.send('OK');
});

app.listen(3000, '0.0.0.0');
