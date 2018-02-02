const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('view engine', 'pug')

mongoose.connect('mongodb://localhost/frontcamp');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const blogSchema = mongoose.Schema({
    name: String
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connection.once('open', function () {
    console.log("Connection Opened.");
});

app.get('/blogs', function (req, res, next) {
    let message = "Method: GET, Path: /blogs";
    console.log(message);

    Blog.find(function (err, blogs) {
        if (err) return res.next(err);
        res.json(blogs);
    });
});

app.get('/blogs/:id', function (req, res, next) {
    let message = "Method: GET, Path: /blogs/" + req.params.id;
    console.log(message);

    Blog.findById(req.params.id, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
    });
});

app.post('/blogs', function (req, res, next) {
    let message = "Method: POST, Path: /blogs";
    console.log(message);

    Blog.create({ name: 'NoName Blog' }, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
    })
});

app.put('/blogs/:id', function (req, res, next) {
    let message = "Method: PUT, Path: /blogs/" + req.params.id;
    console.log(message);

    Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
    });
});

app.delete('/blogs/:id', function (req, res, next) {
    let message = "Method: DELETE, Path: /blogs/" + req.params.id;
    console.log(message);

    Blog.findByIdAndRemove(req.params.id, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
    });
});

app.all('*', function (req, res, next) {
    return res.render('errorPage')
});

app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send(err.message);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));