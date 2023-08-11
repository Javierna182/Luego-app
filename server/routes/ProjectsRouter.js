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
  console.log('in projects router post:', req.body)
  const { title, comments, share, status, coverImage } = req.body;
  const queryText = `INSERT INTO "projects" ("title", "comments", "share", "status", "coverImage", "user_id") 
                    VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(queryText, [title, comments, share, status, coverImage, req.user.id]).then((results) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  //check to see if the user is logged in
  console.log(req.isAuthenticated());
  console.log(req.user);
  const queryText = `SELECT * FROM "projects" WHERE user_id = $1 AND id =$2;`;
  // const queryText = `SELECT * FROM "projects" ORDERED BY "status";`;
  pool.query(queryText, [req.user.id, req.params.id]).then((result) => {//used to show just the info of the user that is logged in
    if (result.rows.length === 1){
      res.status(200).send(result.rows[0])
    } else{
      res.sendStatus(404);
    };
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});


router.put('/:id', (req, res) => {
  let updatedProject = req.body;
  let projectIndex = req.params.id;
  let queryUpdate =`
  UPDATE "projects" SET "title" = $1, "comments" = $2, "share" = $3, "status" = $4, "coverImage" = $5
  WHERE id = $6;
  `;
  pool.query(queryUpdate, [updatedProject.title, updatedProject.comments, updatedProject.share,
    updatedProject.status, updatedProject.coverImage, projectIndex])
    .then(() => {
      res.sendStatus(204)
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
  let projectIndex = req.params.id;
  let queryUpdate =`
  DELETE FROM "projects" 
  WHERE id = $1;
  `;
  pool.query(queryUpdate, [projectIndex])
    .then(() => {
      res.sendStatus(204)
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
});

module.exports = router;
