const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  //user signup
  userSignup: async (req, res) => {
    const lang = req.getLocale();
    const { username, email, password, role } = req.body;
    //find user
    const users = await User.find({ email: req.body.email });
    //user find or not
    if (users) {
      // check email already exists or not
      if (users.length >= 1) {
        return res.status(409).json({
          message: sails.__('email', lang),
        });
      } else {
        //creating hash password using hashSync
        const hash = bcrypt.hashSync(password, 10);
        try{
         const newUser = await User.create({
            username,
            email,
            password: hash,
            role,
         }).fetch();
        return res.status(201).json({
            message: sails.__('addData', lang),
            newUser: newUser,
          });
        }catch (error) {
          return res.status(500).json({
            error:error,
            message: sails.__('notAdded', lang),
          });
        }
      }
    } else {
      return res.status(500).json({
        message: sails.__('notAdded', lang),
      });
    }
  },

  //user login
  userLogin: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { email, password } = req.body;
      //find user
      const user = await User.findOne({ email: email });
      //compare password
      const checkpass = await bcrypt.compare(password, user.password);
      //check password
      if (checkpass === true) {
        try {
          //generate token using helpers
          const token = await sails.helpers.generateToken(email, user.id, '8h');
          //add token to database
          await User.updateOne({ email }, { token: token });

          return res.status(200).json({
            message: sails.__('token', lang),
            token: token,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            error: error ,
            message: sails.__('nottoken', lang),
          });
        }
      } else {
        return res.status(200).json({
          message: sails.__('token', lang),
          token: token,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__('notToken', lang),
      });
    }
  },

  //user logout

  userLogout: async (req, res) => {
    const lang = req.getLocale();

    try {
      //curent login user
      const { email } = req.userData;
      //find user
      await User.findOne({ email });
      //update database token null
      await User.updateOne({ email }).set({ token: ' ' });

      return res.status(200).json({
        message: sails.__('userLogout', lang),
      });
    } catch (error) {
      return res.status(500).json({
        error:error,
        message: sails.__('notLogout', lang),
      });
    }
  },
};
