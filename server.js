const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();

app.use(express.json());


const validateMethod = (req, res, next) => {
  const validMethods = ['GET', 'POST', 'DELETE', 'PUT'];

  if (!validMethods.includes(req.method)) {
    return res.status(405).send('Invalid HTTP method');
  }

  next();
};

app.use(validateMethod);

app.get('/', (req, res) => {
  res.send("Express server");
});

app.use('/tasks-view', listViewRouter);
app.use('/tasks-edit', listEditRouter);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
