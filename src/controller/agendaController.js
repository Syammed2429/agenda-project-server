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
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(401).send(errors.array())
            }

            const agenda = await Agenda.create(req.body);

            return res.status(201).send(agenda)
        } catch (err) {
            return res.status(500).send({ error: "Something went wrong" })

        }
    })


//Get all the agenda items
router.get('', async (req, res) => {
    try {
        //pagination
        const page = +req.query.page || 1;
        console.log('page:', page)
        const size = +req.query.size || 10;
        console.log('size:', size)
        const offSet = (page - 1) * size;


        const agendas = await Agenda.find().limit(size).skip(offSet).lean().exec();

        //Calculating the total agenda items and pages
        const totalAgendas = await Agenda.find().countDocuments().lean().exec();
        const totalPages = Math.ceil(totalAgendas / size)

        return res.status(200).send(agendas, totalPages)

    } catch (err) {
        return res.status(500).send({ error: "Cannot get agenda items" })

    }

})

///Update a particular  agenda items
router.patch('/:id', async (req, res) => {
    try {
        const agenda = await Agenda.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();

        return res.status(202).send(agenda)

    } catch (err) {
        return res.status(500).send({ error: "Unable to update agenda item" })

    }
})
//Delete a particular agenda item
router.delete('/:id', async (req, res) => {
    try {
        const agenda = await Agenda.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(202).send(agenda)

    } catch (err) {
        return res.status(500).send({ error: "Unable to delete an agenda item" })

    }
})


//exporting the module
module.exports = router;