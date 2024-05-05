const InventItem = require('../models/inventItemModel')
const mongoose = require('mongoose')

// get all inventory items
const GetAllInventory = async (req, res) => {
    //res.json({mssg: "GET all inventory items"})
    try {
        const inventItem = await InventItem.find({}).sort({createdAt: -1})
        res.status(200).json(inventItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get a single inventory item
const GetInventItem = async (req, res) => {
    //res.json({mssg: "GET an inventory item"})
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const inventItem = await InventItem.findById(id)

        if(!inventItem) {
            return req.status(404).json({error: "Could not find inventory item"})
        }

        res.status(200).json(inventItem)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create a new inventory item
const CreateInventItem = async (req, res) => {
    //res.json({mssg: "POST a new inventory item"})
    const {title, description, group, status} = req.body

    // doc to db
    try {
        const inventItem = await InventItem.create({title, description, group, status})
        res.status(200).json(inventItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete an inventory item

// update an inventory item

module.exports = {
    GetAllInventory,
    GetInventItem,
    CreateInventItem
}