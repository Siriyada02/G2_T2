const express = require('express');
const cors = require('cors')
const mysql = require('mysql2/promise');
const {SERVER_PORT} = require("./src/configs/constants");
const router = require('./src/routes/routes');


const app= express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',router);


app.listen(SERVER_PORT, () => {
    console.log(`App is running at port ${SERVER_PORT}.`)
  })