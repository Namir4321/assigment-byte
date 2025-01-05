const mongoose=require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    token: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timeStamp: true }
);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id.toString(),
      },
      process.env.SECRET_KEY
    );
    this.token = this.token.concat({
      token: token,
    });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
module.exports=mongoose.model("user",UserSchema)
