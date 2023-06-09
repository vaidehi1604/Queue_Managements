

module.exports = async (req, res, next) => {
  const lang = req.getLocale();

  try {
    const token = await req.headers.authorization.split(' ')[1];
    const decode = await sails.helpers.verifyToken.with({
      token: token,
    });
    const user = await User.findOne({ email: decode.email });
    if (user.role === 'a') {
      return next();
    } else {
      return res.status(401).json({
        message: sails.__('authFail', lang),
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: sails.__('authFail', lang),
    });
  }
};
