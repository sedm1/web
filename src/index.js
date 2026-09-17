import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get(/^\/(\d{6})\/?$/, (req, res, next) => {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    const routeDate = `${day}${month}${String(year).slice(-2)}`;

    if (req.params[0] !== routeDate) {
        return next();
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        date: `${day}-${month}-${year}`,
        login: 'zefirnaya'
    }));
});

app.get('/api/rv/:value', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end([...req.params.value].reverse().join(''));
});

app.listen(3000, '0.0.0.0');
