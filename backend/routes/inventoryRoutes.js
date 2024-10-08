const express = require('express')
const router = express.Router()

//const InventItem = require('../models/inventItemModel') // no longer required due to controller in place
const {CreateInventItem, GetAllInventory, GetInventItem, DeleteInventItem, UpdateInventItem, GetInventItemFromGroupID} = require('../controllers/inventoryController')
const { userVerification } = require('../middleware/authMiddleware')

// Protect group routes
router.use(userVerification);

// GET all inventory items
router.get("/", GetAllInventory);

// GET single inventory item
router.get("/:id", GetInventItem);

// POST an inventory item
router.post("/", CreateInventItem);

// DELETE an inventory item
router.delete("/:id", DeleteInventItem);

// DELETE an inventory item
router.patch("/:id", UpdateInventItem);

// GET single inventory item
router.get("/groupid/:id", GetInventItemFromGroupID);

module.exports = router;