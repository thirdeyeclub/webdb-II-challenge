const express = require("express");
const helmet = require("helmet");
const server = express();
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
//POST
server.post("/api/zoos", (req, res) => {
  const { name } = req.body;
  db("zoos")
    .insert({ name })
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
server.get("/api/zoos", (req, res) => {
  db.select()
    .from("zoos")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "Some useful error ocurred while trying to get data" })
    );
});

//GET ZOOs BY ID
server.get("/api/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos")
    .where({ id: id })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Some useful error ocurred while trying to get data" });
    });
});

//PUT
server.put("/api/zoos/:id", (req, res) => {
  const name = req.body.name;
  const id = req.params.id;
  db("zoos")
    .where({ id })
    .update(name)
    .then(count => {
      if (count > 0) {
        name => {
          res.status(200).json(name);
        };
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
