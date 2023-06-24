const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();

app.use(express.json());


app.use('/tasks-view', listViewRouter);

app.use('/tasks-edit', listEditRouter);


app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
