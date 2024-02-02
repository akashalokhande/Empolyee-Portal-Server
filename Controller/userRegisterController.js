const User = require("../Models/UserRegisterModel");
const jwt = require("jsonwebtoken");
const config = require("../Config/config");
const bcrypt = require("bcrypt");

const create_token = (id) => {
  try {
    const token = jwt.sign({ _id: id }, config.secret_jwt, {
      expiresIn: "10m",
    });
    return token;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.register_user = async (req, resp) => {
  try {
    const { name, Email, Phone, password } = req.body;
    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = new User({
      name,
      Email,
      Phone,
      password: hashedPassword,
    });

    if (!Email || !password || !name || !Phone) {
      return resp
        .status(200)
        .send({ success: null, msg: "All field are requried" });
    }

    const userData = await User.findOne({
      $or: [{ Phone: Phone }, { Email: Email }],
    });
    if (userData) {
      return resp.status(200).send({
        success: false,
        message: "This Email or Phone Is already Register",
      });
    } else {
      const user_data = await user.save();
      return resp.status(200).send({ success: true, data: user_data });
    }
  } catch (error) {
    resp.status(204).send({ msg: error.message });
    console.log(error);
  }
};

module.exports.user_login = async (req, resp) => {
  try {
    const Email = req.body.Email;
    const password = req.body.password;

    if (!Email && !password) {
      return resp.status(200).send({ success:false, msg: "Please fill all the field" });
    }

    const userData = await User.findOne({ Email: Email });
    if (!userData) {
      return resp.status(200).send({ success: null, msg: "incorrect Email!" });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return resp
        .status(200)
        .send({ success: null, msg: "incorrect Password!" });
    }

    if (userData) {
      const tokenData = await create_token(userData._id);
      const userResult = {
        _id: userData._id,
        Email: userData.Email,
        password: userData.password,
        name: userData.name,
        Phone: userData.Phone,
        token: tokenData,
      };
      const response = {
        success: true,
        massage: "User Details Fetch Successfully",
        data: userResult,
      };

      return resp.status(200).send(response);
    } else {
      return resp
        .status(200)
        .send({ success: false, massage: "Login Details Are Incorrect" });
    }
  } catch (error) {
    return resp.status(204).send({ msg: error.message });
  }
};
