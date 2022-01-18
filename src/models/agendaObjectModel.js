//Importing the required packages
const mongoose = require('mongoose');

//Creating schemas
const agendaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
    date: { type: Date, required: true },
},

    {
        versionKey: false,
        timestamps: true
    });


//Creating a new model
const Agenda = mongoose.model('agenda', agendaSchema);

// title, description, statue, date, created at, updated at, etc