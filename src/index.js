import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'x-test,ngrok-skip-browser-warning,Content-Type,Accept,Access-Control-Allow-Headers'
    );
    next();
});

app.use(express.text({ type: '*/*' }));

app.all('/result4/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        message: 'zefirnaya',
        'x-result': req.get('x-test'),
        'x-body': req.body ?? ''
    }));
});

app.listen(3000, '0.0.0.0');
