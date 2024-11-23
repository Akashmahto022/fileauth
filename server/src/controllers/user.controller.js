import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User({
      name: name.toLowerCase(),
      email: email,
      password: hashPassword,
      isAdmin: isAdmin,
    });

    await newUser.save();
    res.json({ success: true, message: "user register successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in register user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        success: false,
        message: "user does not exists with this email",
      });
    }

    const isCorrectPassword = bcryptjs.compareSync(password, user.password);
    if (!isCorrectPassword) {
      return res.json({
        success: false,
        message: "Wrong Password please enter valid password",
      });
    }
    const secretKey =
      "c167c2f61cd933787d4788b820de838bee52e23ee14965ee40321053cd1176e4c67974f1c8f04e5c957a9d47ffbdb0fd17ff7991efa25957771d810031b2f3f9e91f4023097edfaaa21ca7bb4926925e8d7d2a922c21561e99b163c2905a60d6e5179df92c7f5549993d31325c0286f16e1ea593bb01a6a15e59201a994ba055e17f5da244c844175ac7d865df92c893295b13f3f7e80fb1b3c56cb857b2db3ed04ddc8960593cca6691ce0db660a08397ba5d1e6eb1fc20b1fc92b8b07af65e";

    const token = jwt.sign({ id: user._id }, secretKey);

    const userData = await User.findById(user._id).select("-password");
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(userData);
  } catch (error) {
    res.json({ success: false, message: "Error in login" });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).clearCookie("accessToken").json({ message: "Successfully logged out" });
  } catch (error) {
    res.json({ success: false, message: "Error in logout" });
  }
};

export { register, login, logout };
