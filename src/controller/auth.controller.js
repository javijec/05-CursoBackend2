import AuthServices from "../services/auth.services.js";

class authController {
  constructor() {
    this.services = new AuthServices();
  }
  registerController = async (req, res) => {
    const { _id } = req.user;
    const message = "User registered successfully";
    return res.json201(_id, message);
  };
  loginController = async (req, res) => {
    const { token } = req.user;
    const message = "User logged in successfully";
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
    return res.cookie("token", token, opts).json200("OK", message);
  };
  signoutController = async (req, res) => {
    const message = "User logged out successfully";
    const response = "OK";
    return res.cookie("token", req.user.token, { maxAge: 1 }).json200(response, message);
  };
  onlineController = async (req, res) => {
    const message = "User is online";
    const { email } = req.user;
    const response = email;
    return res.json200(response, message);
  };
  veryfyController = async (req, res) => {
    const { email, verifyCode } = req.body;
    const response = await this.services.veryfyService(email, verifyCode);
    if (response) {
      return res.json200(response, "OK");
    } else {
      return res.json401();
    }
  };
  resetPasswordController = async (req, res) => {
    const { email } = req.body;
    const response = await this.services.resetPasswordService(email);
    if (response) {
      return res.json200("OK", response);
    } else {
      return res.json401();
    }
  };
  newPasswordController = async (req, res) => {
    const { email, verifycode, password } = req.body;
    const response = await this.services.newPasswordService(email, verifycode, password);
    if (response) {
      return res.json200("OK", response);
    } else {
      return res.json401();
    }
  };
}

export default authController;
