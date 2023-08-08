const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const{
  rejectUnauthenticated
} = require('../modules/authentication-middleware');// allows us to add more parametter so the router.get


router.get('/', rejectUnauthenticated, (req, res) => {
  //check to see if the user is logged in
  console.log(req.isAuthenticated());
  console.log(req.user);
  const queryText = `SELECT * FROM "projects" WHERE user_id = $1;`;
  // const queryText = `SELECT * FROM "projects" ORDERED BY "status";`;
  pool.query(queryText, [req.user.id]).then((result) => {//used to show just the info of the user that is logged in
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const { name,type } = req.body;
  const queryText = `INSERT INTO "projects" ("title", "comments", "status", "share", "coverImage", "user_id" 
                    VALUES ($1, $2, $3, $4, $5, $6));`;
  pool.query(queryText, [name, type, req.user.id]).then((results) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

module.exports = router;
