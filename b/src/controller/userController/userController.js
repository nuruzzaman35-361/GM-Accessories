const users = require("../../models/users.model");
const Token = require("../../models/token");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../../helplers/sendEmail");
var nodemailer = require('nodemailer');


/**List */
const List = async (req, res, next) => {
  try {
    const results = await users.find()
    res.status(200).json({
      status: true,
      data: results,
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}
/* Login */
const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    const account = await users.findOne({
      email
    })
    if (!account) {
      res.status(404).json({
        status: true,
        message: "Invalid Email || Password"
      })
    }
    
    /* Compare with password */
    const result = await bcrypt.compare(password, account.password)
    if (!result) {
        return res.status(404).json({
            status: false,
            message: "Invalid email or password."
        })
    }

    if (account.isVerified != "true") {
      return res.status(404).json({
          status: false,
          message: "Email Not Verified"
      })
    }

    /* Generate JWT token */
    const token = await jwt.sign({
        id: account._id,
        name: account.name,
        role: account.role,
      },
      process.env.JWT_SECRET, {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      status: true,
      data: token,
      message: "User Login Successfully Done...!",
    });



  } catch (error) {
    console.log(error);
    next(error);
  }
};

/* verify */
const verify = async (req, res, next) => {

  const { id } = req.body;

  console.log(req.body);
    
  const existUser = await users.findOne({
    id
  });
  if (existUser) {
    
     await users.findOneAndUpdate(
      {
        _id: id,
      },
      {
        isVerified: 'true'
      },
      {
        upsert: true,
        new: true,
      }
    )

    res.status(404).json({
      status: true,
      message: "Email Verified...!",
    });


  }



}

/* register */
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    const existUser = await users.findOne({
      email
    });
    if (existUser) {
      res.status(404).json({
        status: false,
        message: "Email Already Exists...!",
      });
    }

    /* Hash password */
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new users({
      name,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();
    
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'alibaba786121@gmail.com',
        pass: 'dbltvvuivdzgvyqt'
      }
    });

    const url = `${process.env.BASE_URL}Verify/${newUser.id}`;
    
    var mailOptions = {
      from: 'alibaba786121@gmail.com',
      to: newUser.email,
      subject: 'Email Verification',
      text: url
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({
      status: true,
      message: "User Registration Successfully...!",
    });
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**profile */
const Profile = async (req, res, next) => {
  try {
    /** user check */
    const existUser = await users.findById(req.user.id)
    console.log(existUser)
    if(!existUser){
      res.status(404).json({
        status: true,
        message: "Invalid User",
      });
    }

    res.status(201).json({
      status: true,
      data: existUser,
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
}
module.exports = {
  login,
  register,
  List,
  Profile,
  verify
};