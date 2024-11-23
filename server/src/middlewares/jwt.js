import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const tokenVerify = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
  
    if (!token)
      return res.json({ success: false, message: "user not authenticated" });

    const secretKey = 'c167c2f61cd933787d4788b820de838bee52e23ee14965ee40321053cd1176e4c67974f1c8f04e5c957a9d47ffbdb0fd17ff7991efa25957771d810031b2f3f9e91f4023097edfaaa21ca7bb4926925e8d7d2a922c21561e99b163c2905a60d6e5179df92c7f5549993d31325c0286f16e1ea593bb01a6a15e59201a994ba055e17f5da244c844175ac7d865df92c893295b13f3f7e80fb1b3c56cb857b2db3ed04ddc8960593cca6691ce0db660a08397ba5d1e6eb1fc20b1fc92b8b07af65e'

  
    const decodeToken = jwt.verify(token, secretKey);
  
    const user = await User.findById(decodeToken?.id).select(
      "-password"
    );
    if (!user) {
      res.json({success: false, message: "invalid access token"})
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"error and invalid access token"})
  }
};

export { tokenVerify };