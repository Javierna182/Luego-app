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
  const queryText = `SELECT * FROM "projects" ORDERED BY "status";`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
