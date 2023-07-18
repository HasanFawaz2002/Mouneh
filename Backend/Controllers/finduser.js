const connect = require('../server/connect');
const UserModel = require("../models/user");


async function getUsers() {
    try {
      await connect(); 
      const users = await UserModel.find(); 
        console.log(users);
      ;
    } catch (error) {
      console.log(error);
    } 
  }

/*async function getUsers() {
    try {
      await connect(); 
      const users = await UserModel.find(); 
      users.forEach((user) => {
        console.log(user.firstname);
      });
    } catch (error) {
      console.log(error);
    } 
  }*/

getUsers();