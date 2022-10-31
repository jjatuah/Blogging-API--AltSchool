const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserId = Schema.ObjectId; 

const UserSchema = new Schema (
    {
      id: UserId,

      firstname: {
        type: String,
        required: true
      },

      lastname: {
        type: String,
        required: true
      },

      username: {
        type: String,
        required: true,
        unique: true
      },

      email: {
        type: String,
        required: true,
        unique: true
      },

      password: {
        type: String,
        required: true
      }
  },
  { timestamps: true }
);


UserSchema.pre(
  'save',
  async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);

      this.password = hash;
      next();
  }
);



UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;