import express from 'express';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/login/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end('zefirnaya');
});

app.get('/promise/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end("function task(x){ return new Promise((resolve, reject) => x < 18 ? resolve('yes') : reject('no')); }");
});

app.get('/fetch/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end(`<!DOCTYPE html>
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

app.listen(3000, '0.0.0.0');
