const express = require('express');
const app = express();
const port = 3000;
let tasks = require('./task.json').tasks;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
    console.log(`${req.method}: Req received at ${req.url} at ${new Date().toLocaleTimeString()}`);
    next();
}

app.use(logger);

// GET /tasks: Retrieve all tasks
app.get('/api/v1/tasks', (req, res) => {
    res.status(200).json(tasks);
})

// GET /tasks/:id: Retrieve a specific task by its ID
app.get('/api/v1/tasks/:id', (req, res) => {
    console.log(req.params.id);
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if(!task) {
        return res.status(404).json({ error: 'Task not found!!' });
    }
    
    res.status(200).json(task);
})


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is running on port ${port}`);
})


module.exports = app;
