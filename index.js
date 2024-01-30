const express =require('express')
const server =express()
const omnitrixData = require('./omnitrix.json');
//get da todas las versiones del omnitrix
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
//delete un omnitrix 
server.delete('/omnitrix/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indexToRemove = omnitrixData.versions.findIndex(x => x.id === id);
    omnitrixData.versions.splice(indexToRemove, 1);
  res.json(omnitrixData.versions);
});
  server.listen(3002,()=>{
    console.log("SERVER IS RUNNING")
    })
