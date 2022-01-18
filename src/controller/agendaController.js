//Importing the required packages
const express = require('express');

const router = express.Router();

router.get('', async (req, res) => {
    return res.send("Agenda")
})


//exporting the module
module.exports = router;