import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.raw({
    type: 'multipart/form-data',
    limit: '10mb'
}));

app.get('/login/', (req, res) => {
    res.send('zefirnaya');
});

app.post('/size2json/', (req, res) => {
    const boundary = req.headers['content-type'].split('boundary=')[1];

    const start = req.body.indexOf(Buffer.from('\r\n\r\n')) + 4;
    const end = req.body.indexOf(Buffer.from(`\r\n--${boundary}`), start);

    const image = req.body.subarray(start, end);

    res.json({
        width: image.readUInt32BE(16),
        height: image.readUInt32BE(20)
    });
});

app.listen(3000, '0.0.0.0');
