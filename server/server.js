const express = require('express');
require('dotenv').config();
process.env.SERVER_SESSION_SECRET// use it if you have an api 


const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const projectsRouter = require('./routes/ProjectsRouter');
const imagesRouter = require('./routes/imagesRouter');
const awsRouter = require('./routes/awsRouter');

const fileUpload = require('express-fileupload');
// Accept file uploads
app.use(fileUpload());

// Express middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/aws', awsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 8002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
