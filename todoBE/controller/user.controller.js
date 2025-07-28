const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) throw new Error("가입된 이메일 입니다.");

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isMtach = bcrypt.compareSync(password, user.password);
      if (isMtach) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      } else {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = userController;
