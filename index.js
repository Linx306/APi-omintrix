const express =require('express')
const fs = require('fs');
const server =express()
const omnitrixData = require('./omnitrix.json');
server.use(express.json());

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

// put para actualizar un omnitrix
server.put('/omnitrix/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedVersion = req.body;
  const indexToUpdate = omnitrixData.versions.findIndex(x => x.id === id);
  if (indexToUpdate !== -1) {
    omnitrixData.versions[indexToUpdate] = {
      ...omnitrixData.versions[indexToUpdate],
      ...updatedVersion
    };
    fs.writeFile('./omnitrix.json', JSON.stringify(omnitrixData, null, 2), (err) => {
    })
    res.json(omnitrixData.versions);
  } else {
    res.status(404).json({ error: 'Omnitrix no encontrado' });
  }
});

// put para actualizar solo la lista de aliens de un omnitrix
server.put('/omnitrix/:id/aliens', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const indexToUpdate = omnitrixData.versions.findIndex(x => x.id === id);
  if (indexToUpdate !== -1) {
    omnitrixData.versions[indexToUpdate] = {
      ...omnitrixData.versions[indexToUpdate],
      ...updatedData
    };
    fs.writeFile('./omnitrix.json', JSON.stringify(omnitrixData, null, 2), (err) => {
    });
    res.json(omnitrixData.versions[indexToUpdate]);
  } else {
    res.status(404).json({ error: 'Omnitrix no encontrado' });
  }
});

// put para actualizar el nombre de un alien por su ID
server.put('/omnitrix/:id/aliens/:alienId', (req, res) => {
  const omnitrixId = parseInt(req.params.id);
  const alienId = parseInt(req.params.alienId);
  const updatedName = req.body.name;
  const omnitrix = omnitrixData.versions.find(x => x.id === omnitrixId);
  if (omnitrix) {
    const alienToUpdate = omnitrix.aliens.find(a => a.id === alienId);
    if (alienToUpdate) {
      // Actualizar el nombre del alien
      alienToUpdate.name = updatedName;
      fs.writeFile('./omnitrix.json', JSON.stringify(omnitrixData, null, 2), (err) => {
      });
      res.json(alienToUpdate);
    } else {
      res.status(404).json({ error: 'Alien no encontrado en el Omnitrix' });
    }
  } else {
    res.status(404).json({ error: 'Omnitrix no encontrado' });
  }
});

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