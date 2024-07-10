const Group = require('../models/groupModel')
const mongoose = require('mongoose')

// get all groups
const GetAllGroups = async (req, res) => {
    const user_id = req.user._id;
    
    try {
      const groups = await Group.find({ user_id }).sort({ createdAt: +1 });
      res.status(200).json(groups);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// get a single group
const GetGroup = async (req, res) => {
    //res.json({mssg: "GET a group"})
    try {
        const { id } = req.params

        // check if mongoose _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const group = await Group.findById(id)

        // check if group doesn't exist
        if(!group) {
            return req.status(404).json({error: "Could not find group"})
        }

        res.status(200).json(group)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create a new group
const CreateGroup = async (req, res) => {
    //res.json({mssg: "POST a new group"})
    const {group_name, notes, user_id} = req.body

    //let emptyNameField = false;

    // doc to db
    try {
        const group = await Group.create({group_name, notes, user_id})
        res.status(200).json(group)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a group
const DeleteGroup = async (req, res) => {
    //res.json({mssg: "DELETE a group"})
    try {
        const { id } = req.params

        // check if mongoose _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const group = await Group.findOneAndDelete({_id: id})

        // check if group doesn't exist
        if(!group) {
            return req.status(404).json({error: "Could not find group"})
        }

        res.status(200).json(group)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update a group
const UpdateGroup = async (req, res) => {
    //res.json({mssg: "UPDATE a group"})
    try {
        const { id } = req.params

        // check if mongoose _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return req.status(404).json({error: "Not valid ID"})
        }
        const group = await Group.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        // check if group doesn't exist
        if(!group) {
            return req.status(404).json({error: "Could not find group"})
        }

        res.status(200).json(group)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    GetAllGroups,
    GetGroup,
    CreateGroup,
    DeleteGroup,
    UpdateGroup
}