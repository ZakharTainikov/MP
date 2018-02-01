const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.set('view engine', 'pug')

mongoose.connect('mongodb://localhost/frontcamp');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const blogSchema = mongoose.Schema({
    name: String
});

blogSchema.methods.print = function () {
    return "<div>Blog: " + this.name + " Id: " + this._id + "</div>";
}

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connection.once('open', function () {
    console.log("Connection Opened.");
});

app.get('/blogs', function (req, res, next) {
    let message = "Method: GET, Path: /blogs";
    console.log(message);

    Blog.find(function (err, blogs) {
        if (err) return res.send(err);

        let ar = [];
        for (let i = 0; i < blogs.length; i++) {
            ar.push(blogs[i].print());
        }

        if (ar.length > 0) {
            res.send(ar.join(" "));
        }
        else {
            res.send("Not Found.");
        }
    });
});

app.get('/blogs/:id', function (req, res, next) {
    let message = "Method: GET, Path: /blogs/" + req.params.id;
    console.log(message);

    Blog.findById(req.params.id, function (err, blog) {
        if (err) return next(err);
        if (!blog) return res.send("Not Found.");

        return res.send(blog.print());
    });
});

app.post('/blogs', function (req, res, next) {
    let message = "Method: POST, Path: /blogs";
    console.log(message);

    Blog.create({ name: 'NoName Blog' }, function (err, blog) {
        if (err) return next(err);
        // saved!
        return res.send(blog.print());
    })
});

app.put('/blogs/:id-:name', function (req, res, next) {
    let message = "Method: PUT, Path: /blogs/" + req.params.id + "-" + req.params.name;
    console.log(message);

    Blog.findByIdAndUpdate(req.params.id, { name: req.params.name }, function (err, blog) {
        if (err) return next(err);
        return res.send("Updated");
    });
});

app.delete('/blogs/:id', function (req, res, next) {
    let message = "Method: DELETE, Path: /blogs/" + req.params.id;
    console.log(message);

    Blog.findByIdAndRemove(req.params.id, function (err, blog) {
        if (err) return next(err);
        return res.send("Removed.");
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