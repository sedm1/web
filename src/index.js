import express from 'express';
import mongodb from 'mongodb';

const { MongoClient } = mongodb;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'x-test,ngrok-skip-browser-warning,Content-Type,Accept,Access-Control-Allow-Headers'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// Работа 1
app.get('/1/', (req, res) => {
    res.setHeader('X-Author', 'zefirnaya');
    res.type('text/plain').send('zefirnaya');
});

app.get('/1/login/', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.get('/1/id/:N', (req, res) => {
    res.json({ id: req.params.N, login: 'zefirnaya' });
});

// Работа 2
app.get('/2/login/', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.get('/2/sample/', (req, res) => {
    res.type('text/plain').send('function task(x){ return x * this ** 2; }');
});

// Работа 3
app.get('/3/login/', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.get('/3/promise/', (req, res) => {
    res.type('text/plain').send(
        "function task(x){ return new Promise((resolve, reject) => x < 18 ? resolve('yes') : reject('no')); }"
    );
});

app.get('/3/fetch/', (req, res) => {
    res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fetch</title>
</head>
<body>
    <input id="inp">
    <button id="bt">Fetch</button>
    <script>
        const inp = document.getElementById('inp');
        document.getElementById('bt').addEventListener('click', () => {
            fetch(inp.value)
                .then(response => response.text())
                .then(result => { inp.value = result; });
        });
    </script>
</body>
</html>`);
});

// Работа 4
app.all(
    '/4/result4/',
    express.text({ type: '*/*' }),
    (req, res) => {
        res.json({
            message: 'zefirnaya',
            'x-result': req.get('x-test'),
            'x-body': req.body ?? ''
        });
    }
);

// Работа 5
app.get(/^\/5\/(\d{6})\/?$/, (req, res, next) => {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    const routeDate = `${day}${month}${String(year).slice(-2)}`;

    if (req.params[0] !== routeDate) {
        return next();
    }

    res.json({
        date: `${day}-${month}-${year}`,
        login: 'zefirnaya'
    });
});

app.get('/5/api/rv/:value', (req, res) => {
    res.type('text/plain').send([...req.params.value].reverse().join(''));
});

// Работа 6
app.get('/6/login/', (req, res) => {
    res.send('zefirnaya');
});

app.post('/6/insert/', express.urlencoded({ extended: false }), async (req, res, next) => {
    try {
        const { login, password, URL } = req.body;
        const client = await new MongoClient(URL).connect();

        await client.db().collection('users').insertOne({ login, password });
        await client.close();

        res.send('OK');
    } catch (error) {
        next(error);
    }
});

app.post(
    '/6/size2json/',
    express.raw({ type: 'multipart/form-data', limit: '10mb' }),
    (req, res) => {
        const boundary = req.headers['content-type'].split('boundary=')[1];
        const start = req.body.indexOf(Buffer.from('\r\n\r\n')) + 4;
        const end = req.body.indexOf(Buffer.from(`\r\n--${boundary}`), start);
        const image = req.body.subarray(start, end);

        res.json({
            width: image.readUInt32BE(16),
            height: image.readUInt32BE(20)
        });
    }
);

app.listen(3000, '0.0.0.0');
