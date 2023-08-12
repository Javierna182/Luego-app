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
    const queryText = `SELECT * FROM "images" ORDER BY "id" ASC WHERE user_id = $1;`;
    pool.query(queryText, [req.user.id]).then((result) => {//used to show just the info of the user that is logged in
      res.send(result.rows);
    }).catch((error) => {
      console.log('ERROR: Get all images',error);
      res.sendStatus(500);
    })
  });

  router.get('/:id', rejectUnauthenticated, (req, res) => {
    //check to see if the user is logged in
    console.log(req.isAuthenticated());
    console.log(req.user);
    const queryText = `
    SELECT images.id FROM projects 
    JOIN projects_images ON projects.id = projects_images.project_id
    JOIN  images ON images.id = projects_images.images_id
    WHERE user_id = $1 projects.id = $2;
    `;
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

  module.exports = router;