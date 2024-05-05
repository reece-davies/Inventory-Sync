const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    group: {
        type: String
    },
    status: {
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model('InventItem', inventItemSchema)