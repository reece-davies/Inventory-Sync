const express = require('express');
const router = express.Router();
const { GetAllGroups, GetGroup, CreateGroup, DeleteGroup, UpdateGroup } = require('../controllers/groupController');
const { userVerification } = require("../middleware/authMiddleware");

// Protect group routes
router.use(userVerification);

// GET all groups
router.get("/", GetAllGroups);

// GET single group
router.get("/:id", GetGroup);

// POST a group
router.post("/", CreateGroup);

// DELETE a group
router.delete("/:id", DeleteGroup);

// PATCH a group
router.patch("/:id", UpdateGroup);

module.exports = router;
