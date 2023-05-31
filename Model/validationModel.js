const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt')

const validationSchema = new Schema({
    email: {
        type: String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    }
},{timestamps : true})

validationSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  })

  validationSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("password incorrect");
    }
    throw Error("email incorrect");
  };

const validateModel = mongoose.model('validation', validationSchema)

module.exports = validateModel