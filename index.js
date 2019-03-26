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
  const name = req.body;
  db.insert(name).into('zoos')
  .then(ids => {
    const id = ids[0];
    db('zoos')
      .where({ id })
      .first()
      .then(data => {
        res.status(201).json(data);
      });
    }).catch(err=>res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
