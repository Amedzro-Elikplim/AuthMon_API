const User = require("../models/User");
const {validateRegistrationInputs, validateUserInputs } = require("../utils/validator");


//register user
const registerUser = async (req, res) => {
    //get user info from front end and validate using joi
    const result = await validateRegistrationInputs.validateAsync(req.body);
    const { first_name, last_name, email, password, confirm_password } = result;
      
      const newUser = {
          first_name,
          last_name,
          email,
          password,
          confirm_password
      };

      //check if the user exist in the data base
      let userExist = await User.findOne({ email });
      if(userExist) return res.status(401).send("user with email already exist");

      const user = User.create(newUser);

      res.status(200).send({user});
} 

module.exports = {
    registerUser
}