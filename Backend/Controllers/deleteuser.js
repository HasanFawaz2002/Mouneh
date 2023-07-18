const connect = require('../server/connect');
const UserModel = require("../models/user");

async function deleteUserById(userId) {
    try {
      await connect();
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      console.log('User deleted:', deletedUser);
    } catch (error) {
      console.log(error);
    }
  }
  
  deleteUserById('65a7f8049633945cd3642b61');