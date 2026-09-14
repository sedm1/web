import express from 'express';

const app = express();

app.enable('strict routing');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.type('text/plain').send('zefirnaya');
});

app.get('/login/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end('zefirnaya');
});

app.get('/promise/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end("function task(x){ return x < 18 ? Promise.resolve('yes') : Promise.reject('no'); }");
});

app.get('/fetch/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fetch</title>
</head>
<body>
    <input id="inp">
    <button id="bt">Fetch</button>
    <script>
        const inp = document.getElementById('inp');
        const bt = document.getElementById('bt');

        bt.addEventListener('click', () => {
            fetch(inp.value)
                .then(response => response.text())
                .then(text => {
                    inp.value = text;
                });
        });
    </script>
</body>
</html>`);
});


app.listen(3000);
