const mongoose = require('mongoose');

const lawschema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const lawmodel = mongoose.model('lawsolver', lawschema);
module.exports = lawmodel;
