const express = require('express')
const router = express.Router()

//const InventItem = require('../models/inventItemModel') // no longer required due to controller in place
const {CreateInventItem, GetAllInventory, GetInventItem,} = require('../controllers/inventItemController')

// GET all inventory items
router.get("/", GetAllInventory)

// GET single inventory item
router.get("/:id", GetInventItem)

// POST an inventory item
router.post("/", CreateInventItem)

// DELETE an inventory item
router.delete("/:id", (req, res) => {
    res.json({mssg: "DELETE an inventory item"})
})

// DELETE an inventory item
router.patch("/:id", (req, res) => {
    res.json({mssg: "UPDATE an inventory item"})
})

module.exports = router