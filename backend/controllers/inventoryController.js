const InventItem = require('../models/inventoryModel')
const mongoose = require('mongoose')

// get all inventory items
const GetAllInventory = async (req, res) => {
    //res.json({mssg: "GET all inventory items"})
    const user_id = req.user._id

    try {
        const inventory = await InventItem.find({user_id}).sort({createdAt: +1})
        res.status(200).json(inventory)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get a single inventory item
const GetInventItem = async (req, res) => {
    //res.json({mssg: "GET an inventory item"})
    try {
        const { id } = req.params

        // check if mongoose _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const inventItem = await InventItem.findById(id)

        // check if inventory item doesn't exist
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
    const {title, description, group, status, user_id} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(group == "0") {
        emptyFields.push('group')
    }
    if(status == "select_status") {
        emptyFields.push('status')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the required fields", emptyFields})
    }

    // doc to db
    try {
        const inventItem = await InventItem.create({title, description, group, status, user_id})
        res.status(200).json(inventItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete an inventory item
const DeleteInventItem = async (req, res) => {
    //res.json({mssg: "DELETE an inventory item"})
    try {
        const { id } = req.params

        // check if mongoose _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const inventItem = await InventItem.findOneAndDelete({_id: id})

        // check if inventory item doesn't exist
        if(!inventItem) {
            return req.status(404).json({error: "Could not find inventory item"})
        }

        res.status(200).json(inventItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update an inventory item
const UpdateInventItem = async (req, res) => {
    //res.json({mssg: "UPDATE an inventory item"})
    try {
        const { id } = req.params

        // check if mongoose _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const inventItem = await InventItem.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        // check if inventory item doesn't exist
        if(!inventItem) {
            return req.status(404).json({error: "Could not find inventory item"})
        }

        res.status(200).json(inventItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get a single inventory item
const GetInventItemFromGroupID = async (req, res) => {
    //res.json({mssg: "GET an inventory item"})
    try {
        const { id } = req.params

        // check if mongoose _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const inventItem = await InventItem.findOne({group: id})

        // check if inventory item doesn't exist
        /*
        if(!inventItem) {
            return req.status(404).json({error: "Could not find inventory item"})
        }*/

        res.status(200).json(inventItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    GetAllInventory,
    GetInventItem,
    CreateInventItem,
    DeleteInventItem,
    UpdateInventItem,
    GetInventItemFromGroupID
}