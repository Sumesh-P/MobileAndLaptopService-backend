const express = require('express');
require('dotenv').config();
const router = require('./Routes/router');
const db = require('./DB/connection');
const cors = require('cors');

const PORT = 3000;
const pServer = express();

// Use express.json() before cors()
pServer.use(express.json()); 
pServer.use(cors()); 

pServer.use(router); 

pServer.use('uploads',express.static('./uploads'))

pServer.listen(PORT, () => {
  console.log(`pServer running on PORT ${PORT}`);
});