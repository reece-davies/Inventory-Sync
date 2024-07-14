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
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('InventItem', inventItemSchema)