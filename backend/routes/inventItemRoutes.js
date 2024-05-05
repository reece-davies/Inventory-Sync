const express = require('express')
const router = express.Router()

const InventItem = require('../models/inventItemModel')

// GET all inventory items
router.get("/", (req, res) => {
    //req.body // something to use later on
    res.json({mssg: "GET all inventory items"})
})

// GET single inventory item
router.get("/:id", (req, res) => {
    res.json({mssg: "GET an inventory item"})
})

// POST an inventory item
router.post("/", async (req, res) => {
    const {title, description, group, status} = req.body
    try {
        const inventItem = await InventItem.create({title, description, group, status})
        res.status(200).json(inventItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    //res.json({mssg: "POST a new inventory item"})
})

// DELETE an inventory item
router.delete("/:id", (req, res) => {
    res.json({mssg: "DELETE an inventory item"})
})

// DELETE an inventory item
router.patch("/:id", (req, res) => {
    res.json({mssg: "UPDATE an inventory item"})
})

module.exports = router