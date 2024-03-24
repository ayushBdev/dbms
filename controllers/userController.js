const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getuser = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()

    const result = (await sql`select * from users where id = ${req.params.id}`)[0];
    if (!result) {
      return res.status(400).send("User not found");
    }
    return res.send(result);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const result = await sql`select * from users`;
    if (!result?.length) {
      return res.status(400).send("No users found");
    }
    return res.send(result);
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const login = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const emailPresent = (await sql`select * from users where email = ${req.body.email}`)[0];
    if (!emailPresent) {
      return res.status(400).send("Incorrect credentials");
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      emailPresent.password
    );
    if (!verifyPass) {
      return res.status(400).send("Incorrect credentials");
    }
    const token = jwt.sign(
      { userId: emailPresent.id, isAdmin: emailPresent.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    return res.status(201).send({ msg: "User logged in successfully", token });
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
};

const register = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const emailPresent = await sql`select * from users where email = ${req.body.email}`;
    if (emailPresent?.[0]?.length) {
      return res.status(400).send("Email already exists");
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = await sql`
      insert into users (email, password, is_admin, is_doctor, age, firstname, lastname)
      values (${req.body.email}, ${hashedPass}, false, false, 10, ${req.body.firstname}, ${req.body.lastname})
    `;
    if (!user) {
      return res.status(500).send("Unable to register user");
    }
    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to register user");
  }
};

const updateprofile = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await sql`update users set email = ${req.body.email}, password = ${hashedPass} where id = ${req.locals}`;
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
};
