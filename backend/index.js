const express = require('express')
const connect = require('./src/config/db');
const router = require('./src/routes/index');
let cors = require("cors");

connect();  
const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;
app.use('/',router);

app.listen(port, () => {
  console.log(`myNotbook app listening at http://localhost:${port}`)
})