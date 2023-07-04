const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("express server")
});

app.use('/api/tasks', router);

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
