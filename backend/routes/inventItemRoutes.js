const express = require("express")

const router = express.Router()

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
router.post("/", (req, res) => {
    res.json({mssg: "POST a new inventory item"})
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