const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const{
  rejectUnauthenticated
} = require('../modules/authentication-middleware');// allows us to add more parametter so the router.get

// router.get('/', rejectUnauthenticated, (req, res) => {
//     //check to see if the user is logged in
//     console.log(req.isAuthenticated());
//     console.log(req.user);
//     const queryText = `SELECT images.url FROM projects 
//     JOIN projects_images ON projects.id = projects_images.project_id
//     JOIN  images ON images.id = projects_images.image_id
//     WHERE user_id = $1 AND projects.id = $2;`;
//     pool.query(queryText, [req.user.id]).then((result) => {//used to show just the info of the user that is logged in
//       res.send(result.rows);
//     }).catch((error) => {
//       console.log('ERROR: Get all images',error);
//       res.sendStatus(500);
//     })
//   });

  router.post('/', rejectUnauthenticated, (req, res) => {
    //check to see if the user is logged in
    console.log(req.isAuthenticated());
    console.log(req.user,"images query");
    console.log(req.body,"heree images query");
    const queryText = `
    SELECT images.url FROM projects 
    JOIN projects_images ON projects.id = projects_images.project_id
    JOIN  images ON images.id = projects_images.image_id
    WHERE user_id = $1 AND projects.id = $2 ORDER BY "name" DESC;
    `;
    pool.query(queryText, [req.user.id, req.body.id]).then((result) => {//used to show just the info of the user that is logged in
     
        res.status(200).send(result.rows)
      
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
  });

  module.exports = router;