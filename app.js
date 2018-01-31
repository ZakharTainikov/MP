const express = require('express');
const app = express();

app.set('view engine', 'pug')

app.get('/blogs', function (req, res, next) {
    let message = "Method: GET, Path: /blogs";
    console.log(message);
    res.send(message);
});

app.get('/blogs/:id', function (req, res, next) {
    let message = "Method: GET, Path: /blogs/" + req.params.id;
    console.log(message);
    res.send(message);
});

app.post('/blogs', function (req, res, next) {
    let message = "Method: POST, Path: /blogs";
    console.log(message);
    res.send(message);
});

app.put('/blogs/:id', function (req, res, next) {
    let message = "Method: PUT, Path: /blogs/" + req.params.id;
    console.log(message);
    res.send(message);
});

app.delete('/blogs/:id', function (req, res, next) {
    let message = "Method: DELETE, Path: /blogs/" + req.params.id;
    console.log(message);
    res.send(message);
});

app.all('*', function (req, res, next) {
    let api = `GET / blogs 
    GET / blogs / { id }
    POST / blogs
    PUT / blogs / { id }
    DELETE / blogs / { id }`;

    res.render('errorPage', { message: api })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));