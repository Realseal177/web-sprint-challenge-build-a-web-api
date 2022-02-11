const express = require('express');
const server = express();

// const projectsRouter = require('./projects/projects-router');

server.use(express.json());

// server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hello!</h2>`);
  });

module.exports = server;
