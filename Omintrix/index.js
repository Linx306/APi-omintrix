const express =require('express')
const server =express()
const omnitrixData = require('./omnitrix.json');

server.get('/omnitrix', (req, res) => {
    res.json(omnitrixData.versions);
  });