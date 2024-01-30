const express =require('express')
const fs = require('fs');
const server =express()
const omnitrixData = require('./omnitrix.json');
//get da todas las versiones del omnitrix
server.use(express.json());
server.get('/omnitrix', (req, res) => {
  res.json(omnitrixData.versions);
});
//get para un omnitrix espesifico mediante id
server.get('/omnitrix/:id', (req, res) =>{
  const id = parseInt(req.params.id)
  const version = omnitrixData.versions.find(x => x.id === id);
  res.json(version);
})
//get para los aliens de un omnitrix
server.get('/omnitrix/:id/aliens', (req, res) => {
  const id = parseInt(req.params.id);
  const version = omnitrixData.versions.find(x => x.id === id);
  res.json(version.aliens);
})
//delete omnitrix
server.delete('/omnitrix/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indexToRemove = omnitrixData.versions.findIndex(x => x.id === id);
    omnitrixData.versions.splice(indexToRemove, 1);
    fs.writeFile('./omnitrix.json', JSON.stringify(omnitrixData, null, 2), (err) => {
    });
  res.json(omnitrixData.versions);
});


//agregar omnitrix
server.post('/omnitrix', (req, res) => {
  const newVersion = req.body;
  omnitrixData.versions.push(newVersion);
  fs.writeFile('./omnitrix.json', JSON.stringify(omnitrixData, null, 2), (err) => {
  })
  res.json(omnitrixData.versions);
});

  server.listen(3002,()=>{
    console.log("SERVER IS RUNNING")
    }) 

