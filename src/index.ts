const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from my-express-app!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});