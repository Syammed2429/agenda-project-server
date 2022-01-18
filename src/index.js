//Importing the packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const agendaController = require('./controller/agendaController')

//assigning the port
const port = process.env.PORT || 2924;

//Assigning the express to the app variable
const app = express();

app.use(express.json());

//Using cors to prevent from the cors errors
app.use(cors());

//API Points
app.use('/agenda', agendaController)

//export the app and port 
module.exports = {
    app,
    port
}

