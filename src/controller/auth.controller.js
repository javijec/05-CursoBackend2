class authController {
  constructor() {}
  register = async (req, res) => {
    const { _id } = req.user;
    const message = "User registered successfully";
    return res.json201(_id, message);
  };
  login = async (req, res) => {
    const { token } = req.user;
    const message = "User logged in successfully";
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
    return res.cookie("token", token, opts).json200("OK", message);
  };
  signout = async (req, res) => {
    const message = "User logged out successfully";
    return res.cookie("token", req.user.token, { maxAge: 1 }).json200(response, message);
  };
  online = async (req, res) => {
    const message = "User is online";
    return res.json200("OK", message);
  };
}

export default authController;
