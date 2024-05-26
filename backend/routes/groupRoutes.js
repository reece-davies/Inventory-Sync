const express = require('express')
const router = express.Router()

const {GetAllGroups, GetGroup, CreateGroup, DeleteGroup, UpdateGroup} = require('../controllers/groupController')

// GET all group
router.get("/", GetAllGroups)

// GET single group
router.get("/:id", GetGroup)

// POST an group
router.post("/", CreateGroup)

// DELETE an group
router.delete("/:id", DeleteGroup)

// DELETE an group
router.patch("/:id", UpdateGroup)

module.exports = router