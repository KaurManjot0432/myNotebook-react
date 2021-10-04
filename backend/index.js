const express = require('express')
const connect = require('./src/config/db');
const router = require('./src/routes/index');

connect();  
const app = express();
app.use(express.json());
const port = 3001;
app.use('/',router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})