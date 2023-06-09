
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  const lang = req.getLocale();

  try {
    const token = await req.headers.authorization.split(' ')[1];
    console.log(token);
    //verify token
    const decode = await sails.helpers.verifyToken.with({
      token: token,
    });
    console.log(decode);
    req.userData = decode;
    const user = await User.findOne({ email: decode.email });
    if (!decode) {
      return res.status(404).json({ message: sails.__('notmatch', lang) });
    }

    if (user.role === 'u') {
      return next();
    } else {
      return res.status(401).json({ message: sails.__('authFail', lang) });
    }
  } catch (error) {
    return res.status(401).json({
      error:error,
      message: sails.__('authFail', lang),
    });
  }
};
