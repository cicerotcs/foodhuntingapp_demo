const bcrypt = require("bcrypt");
const client = require("../db/connect");
const { signupUser, selectUser } = require("../db/queries");

const signupPage = (req, res) => {
  res.render("signup");
};

const signinPage = (req, res) => {
  res.render("signin");
};

const signin = async (req, res) => {
  const { email, password: inputPassword } = req.body;

  if (email && inputPassword) {
    const dbRes = await client.query(selectUser, [email]);
    if (dbRes.rowCount === 1) {
      const { id, password } = dbRes.rows[0];
      const match = await bcrypt.compare(inputPassword, password);
      if (match) {
        req.session.userId = id;
        req.session.authorized = true;
        return res.status(200).redirect("/");
      } else {
        return res.status(400).json({ msg: "Wrong password" });
      }
    } else {
      return res.status(400).json({ msg: "Wrong email" });
    }
  } else {
    res.status(400).json({ msg: "You need to provide an email and password" });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const dbRes = await client.query(selectUser, [email]);

    if (dbRes.rowCount === 1) {
      return res
        .status(400)
        .json({ msg: "This email has already been registered!" });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
      if (!err) {
        const dbRes = await client.query(signupUser, [email, hashedPassword]);
        if (dbRes.rowCount === 1) {
          res.redirect("/");
        }
      }
    });
  } else {
    res.status(400).json({ msg: "You need to provide email and password" });
  }
};

module.exports = { signupPage, signinPage, signup, signin };
