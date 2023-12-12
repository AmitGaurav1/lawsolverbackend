const mongoose = require('mongoose')
const questiondata = mongoose.Schema({
    title: {
        type: 'string',
        required: true,
    },
    question: {
        type: 'string',
        required: true,
    },
    answer: [{
        type: String,
    }],
})
const lawquestiondata = mongoose.model('lawquestiondata', questiondata);
module.exports = lawquestiondata;