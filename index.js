const express =require('express')
const server =express()
const omnitrixData = require('./omnitrix.json');

server.get('/', (req, res) => {
    res.json(omnitrixData.versions);
  });

  server.listen(3002,()=>{
    console.log("SERVER IS RUNNING")
    })