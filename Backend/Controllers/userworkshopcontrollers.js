// controllers/workshopRegistration.js
const UserWorkshopModel = require('../models/userworkshop');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports.registerForWorkshop = async (req, res) => {
  const workshopId  = req.params.workshopID;
  const userId = req.user.user.id;

  try {
    // Check if the user has already registered for this workshop
    const existingRegistration = await UserWorkshopModel.findOne({ user: userId, workshop: workshopId });
    if (existingRegistration) {
      return res.status(400).json('You are already registered for this workshop.');
    }

    // Create a new registration entry
    const registration = new UserWorkshopModel({
      user: userId,
      workshop: workshopId
    });

    const savedRegistration = await registration.save();
    res.status(201).json(savedRegistration);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.fetchUserWorkshops = async (req, res) => {
  const userId = req.user.user.id;

  try {
    // Find workshops registered by the user
    const userWorkshops = await UserWorkshopModel.find({ user: userId }).populate("workshop");
    res.status(200).json(userWorkshops);
  } catch (err) {
    res.status(500).json(err);
  }
};