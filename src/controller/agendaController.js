//Importing the required packages
const express = require('express');
const { body, validationResult } = require('express-validator');

const Agenda = require('../models/agendaObjectModel')

const router = express.Router();



//CRUD Controllers
//Create a agenda items
router.post('',
    //validating the agenda items
    body("title").notEmpty().withMessage("Title should not be empty"),
    body("description").isLength({ min: 10, max: 200 }).withMessage("Description must be minimum of 10 characters and maximum of 200 characters"),
    body("status").notEmpty().withMessage("The status must be updated"),
    body("date").notEmpty().withMessage("Date should not be empty"),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).send(errors.array())
        }

        const agenda = await Agenda.create(req.body);

        return res.status(201).send(agenda)

    })


//Get all the agenda items
router.get('', async (req, res) => {
    return res.send("Agenda")
})

///Update a particular  agenda items

//Delete a particular agenda item


//exporting the module
module.exports = router;