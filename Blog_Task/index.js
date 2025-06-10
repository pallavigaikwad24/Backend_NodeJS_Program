// Blog CRUD

const express = require('express');
const app = express();
const data = require('./blog.json');

app.use(express.urlencoded({ extended: true }));

const logMiddleware = (req, res, next) => {
    console.log("Current Request:", req.methd, req.url);
    next();
}

const errorMiddleware = (err, req, res, next) => {
    if (err) {
        console.log("Error Occuring on this request:", req.method, req.url);
        console.log("Error Message:", err.message);
        return res.send("Error Occured");
    }
    next();
}

app.use(logMiddleware);
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send(data)
});

app.post('/', (req, res) => {
    const newBlog = { id: req.body.id, name: req.body.name };
    data.push(newBlog);
    res.send(data);
});

app.patch('/:id', (req, res) => {
    const blogId = req.params.id;
    const blogIndex = data.findIndex(blog => blog.id == blogId);
    console.log(blogIndex);
    if (blogIndex !== -1) {
        data[blogIndex].name = req.body.name;
        res.send(data);
    } else {
        res.status(404).send("Blog not found");
    }
});

app.delete('/:id', (req, res) => {
    const blogId = req.params.id;
    const filteredData = data.filter(blog => blog.id != blogId);
    res.send(filteredData);
});

app.listen(3300, () => {
    console.log("Server is running on port 3300");
});
