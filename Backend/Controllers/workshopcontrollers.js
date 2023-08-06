const WorkshopModel = require("../models/workshop");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
// Add a new workshop (accessible only to admin)
module.exports.addWorkshop = async (req, res) => {
  if (req.user.user.isAdmin) {
    try {
      const newWorkshop = await WorkshopModel.create(req.body);
      res.status(201).json(newWorkshop);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You do not have admin privileges to add a workshop.');
  }
};

// Update an existing workshop (accessible only to admin)
module.exports.updateWorkshop = async (req, res) => {
  if (req.user.user.isAdmin) {
    try {
      const workshopID = req.params.workshopID;
      const updatedWorkshop = await WorkshopModel.findByIdAndUpdate(
        workshopID,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedWorkshop);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You do not have admin privileges to update a workshop.');
  }
};

// Delete an existing workshop (accessible only to admin)
module.exports.deleteWorkshop = async (req, res) => {
  if (req.user.user.isAdmin) {
    try {
      const workshopID = req.params.workshopID;
      await WorkshopModel.findByIdAndRemove(workshopID);
      res.status(200).json('Workshop deleted successfully.');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You do not have admin privileges to delete a workshop.');
  }
};

// Get all workshops (accessible only to admin)
module.exports.getAllWorkshops = async (req, res) => {
    try {
      const workshops = await WorkshopModel.find();
      res.status(200).json(workshops);
    } catch (err) {
      res.status(500).json(err);
    }
};

module.exports.getWorkshopById = async (req, res) => {
  
  const workshopId = req.params.id; // Assuming you're passing the workshop ID through the request params
  try {
    const workshop = await WorkshopModel.findById(workshopId);
    if (workshop) {
      res.status(200).json(workshop);
    } else {
      res.status(404).json('Workshop not found.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
