const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.postregister = async (req, res, next) => {
  const { name, email, password } = req.body;
  // validate the field 
  if (!name || !email || !password ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  // check if there is existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }
  // create a new user object
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    // create token
    const token = await newUser.generateAuthToken();
    // save the user sucessfully
    const savedUser = await newUser.save();
    // response if the user is saved
    res.status(201).json(savedUser);
  } catch (error) {
    // response if there is an error
    console.log(error);
    res.status(500).json(error);
  }
};
exports.postlogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

//validate fields
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    // check for the email is there or not is db
    const user = await User.findOne({ email });
    if (!user) {
      // response if there is no user
      return res.status(404).json({ error: "User not found" });
    }
    if (user) {
      // check if the password is correct or not using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // response if there is not password match
        return res.status(401).json({ error: "Invalid credentials" });
      }
      if (isMatch) {
        // store userid in session
        req.session.user = user;
        const userId = user._id;
// create a access token
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        // delete the password from the user info
        const userResponse = user.toObject();
        delete userResponse.password;
        // response to send after login succesfull
        res.status(200).json({
          message: "Login successful",
          accessToken,
          userId,
          user: userResponse,
        });
      }
    }
  } catch (err) {
    // if there is an error response
    res.status(500).json({ error: "Internal server error" });
  }
};
