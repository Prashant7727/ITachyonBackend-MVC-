const User =require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdhflksdhkjkjdkjvdjfdb";
const JWT_REFRESH_SECRET="sakjdhasljddowq"


const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  };
  
 
  
  const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ error: "Invalid password" });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
    res.json({
      status: 200,
      message: "success",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userRole: user.userRole,
        clinicName: user.clinicName,
        clinicCode: user.clinicCode,
        clinicBlock: user.clinicBlock,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  };
  
  
  // Refresh Token endpoint-------------------------------------------------------------------------------------------
  const refreshAccessToken = (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not provided" });
    }
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
      const accessToken = generateAccessToken(decoded.userId);
      res.json({
        status: 200,
        message: "success",
        data: {
          accessToken: accessToken,
        },
      });
    });
  };

  //get user data-----------------------------------------------------------------
const getData = async (req, res, next) => {
    try {
      const users = await User.find();
      if (users.length > 0) {
        res.send(users);
      } else {
        res.send({ result: "no users found" });
      }
    } catch (error) {
      next(error);
    }
  };

  //get current User Data-----------------------------------------------------------

const getCurrentUserData = async (req, res, next) => {
    let result = await User.findById({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "no record" });
    }
  };

 


  module.exports ={
    // authenticateToken,
    loginUser,
    refreshAccessToken,
    getData,
    getCurrentUserData,
    // createDeal
  }