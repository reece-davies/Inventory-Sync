const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    group_name: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
})

module.exports = mongoose.model('Group', groupSchema)