const express = require('express');
const helmet = require('helmet');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
//POST
server.post('/api/zoos', (req, res) => {
  const {name}= req.body;
  db('zoos').insert({name})
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({ 
        error: "Some useful error message. Your post request is no good" 
      });
    });
});

//GET ZOOs
server.get('/', (req,res)=>{
  db.select().from('zoos')
  .then(data =>{ res.status(200).json(data)})
  .catch(()=>res.status(500).json({error: "Some useful error ocurred while trying to get data"}))
})

//GET ZOOs BY ID



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
