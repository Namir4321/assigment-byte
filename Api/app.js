require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const session = require("express-session");
const app = express();
const cors = require("cors");
const User = require("./models/User");
const AuthRoutes = require("./routes/AuthRoute");
const TaskRoutes = require("./routes/TaskRoute");

const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected");
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);
app.use(
  session({
    name: "cookie",
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
    },
  })
);
app.use("/api/auth", AuthRoutes);
app.use("/api", TaskRoutes);

app.listen(port, () => {
  console.log(`listning at port ${port}`);
});
