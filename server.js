const express = require('express');
const app = express();


const tasks = [
  {
    id: "123456",
    isCompleted: false,
    description: "Walk the dog"
  },
  {
    id: "789012",
    isCompleted: true,
    description: "Go to gym"
  },
  {
    id: "345678",
    isCompleted: false,
    description: "Clean the house"
  }
];


app.use(express.json());

app.get('/', (req, res) => {
  res.json(tasks);
});


app.listen(8080, () => {
  console.log(`Server is running on 8080`);
});
