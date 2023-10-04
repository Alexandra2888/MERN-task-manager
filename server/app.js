const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const tasksRouter = require('./routes/tasksRouter');


const app = express();


// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());




// 3) ROUTES
app.use('/api/v1/tasks', tasksRouter);


module.exports = app;
