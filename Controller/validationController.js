const jwt = require('jsonwebtoken');
const joi = require("joi");

const validateSchema = require('../Model/validationModel');
const validateModel = require('../Model/validationModel');

const authSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().required(),
});

function createToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  }

const createUser = async (req, res) => {
    try{
        const user = req.body;
      if(user){
      const validation = await authSchema.validateAsync(req.body)
      const userExist = await validateSchema.findOne({email : validation.email})
      if(userExist){
        return res.status(200).json({status : "success", message : "user already exists"})
      } 
      const userData = new validateSchema(validation)
      await userData.save();
      return res.status(200).json({staus: "success", message: 'user saved successfully'})
    }
      return res.status(400).json({staus: "error", message: 'enter user details'})
    }
    catch(err){
        res.status(400).json({status :"error", message :err});
    }
}

const loginUser = async (req, res) => {
    try{
    const { email, password } = req.body;
    if (email && password) {
        const user = await validateModel.login(email, password);
        const userDetails = await validateModel.findOne({
          email: user.email,
          password: user.password,
        });
        return res
          .status(200)
          .json({ status: "success", token: createToken(userDetails._id) });
      }
      return res
        .status(404)
        .json({ status: "faiure", err: "check login credentials" });
    }
catch(err){
return res.status(400).json({status :"error", message : err})
}
}
module.exports = {createUser : createUser, loginUser : loginUser}

