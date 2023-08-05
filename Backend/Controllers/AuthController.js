const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const nodeMailer = require('nodemailer');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const connect = require('../server/connect');

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname,lastname, email, password,city,age,phonenumber } = req.body;
  if (!firstname || !lastname || !email || !password || !city || !age || !phonenumber) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    city,
    age,
    phonenumber
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data us not valid");
  }
 
});
console.log(process.env.ACCESS)
//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          isAdmin:user.isAdmin
        },
      },
      process.env.ACCESS,
      { expiresIn: "1d" }
    );
    res.status(200).json({ user,accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

const forgot = asyncHandler(async (req, res) =>   {
  const {email} = req.body;
  User.findOne({email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign(
        {
          user: {
            email: user.email,
            id: user._id,
            isAdmin:user.isAdmin
          },
        }
        ,  process.env.ACCESS, {expiresIn: "1d"})

      var transporter = nodeMailer.createTransport({
          service: 'gmail',
           auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS
           }
        });
        
        var mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Reset Password Link',
          text: `http://localhost:3000/reset_password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})


const reset = asyncHandler(async (req, res) =>  {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token,process.env.ACCESS, (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              User.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})



module.exports = { registerUser, loginUser,forgot,reset };