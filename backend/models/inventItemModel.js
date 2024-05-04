const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('InventItem', inventItemSchema)