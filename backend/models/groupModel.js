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
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Group', groupSchema)