const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const conection = require("../database/connection");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    country,
    phone,
    username,
    email,
    password,
  } = req.body;
  let isUserDuplicated;
  let isEmailDuplicated;
  try {
    isUserDuplicated = await doesUserExist(username);
    isEmailDuplicated = await doesEmailExist(email);
  } catch (err) {
    console.log(err.message);
  }
  if (isUserDuplicated)
    return res.json({ error: "This username already exists!" });
  else if (isEmailDuplicated)
    return res.json({ error: "This email already exists!" });
  bcrypt.hash(password, 10).then((hash) => {
    const queryUser =
      "INSERT INTO user (username,email,password,role) VALUES (?,?,?,?)";
    conection.query(
      queryUser,
      [username, email, hash, "user"],
      (err, result, fields) => {
        if (err) return res.json({ error: err.message });
        const queryProfile =
          "INSERT INTO profile (id,firstName,lastName,address,country,phone) VALUES (?,?,?,?,?,?)";
        conection.query(
          queryProfile,
          [result.insertId, firstName, lastName, address, country, phone],
          (err, result, fields) => {
            if (err) return res.json({ error: err.message });
            res.json("SUCCESS");
          }
        );
      }
    );
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const queryUser = "SELECT * FROM user where username=?";
  conection.query(queryUser, [username], (err, result) => {
    if (err) return res.json({ error: err.message });
    if (result.length === 0) {
      return res.json({ error: "User doesn't exist" });
    }

    bcrypt.compare(password, result[0].password).then((match) => {
      if (!match) {
        return res.json({ error: "Wrong Password combination!" });
      }

      const queryProfile = "SELECT * FROM profile where id=?";
      conection.query(queryProfile, [result[0].id], (err, result2, fields) => {
        if (err) return res.json({ error: err.message });
        const accessToken = sign(
          {
            username: result[0].username,
            email: result[0].email,
            role: result[0].role,
            id: result[0].id,
            firstName: result2[0].firstName,
            lastName: result2[0].lastName,
            address: result2[0].address,
            country: result2[0].country,
            phone: result2[0].phone,
          },
          "importantsecret"
        );
        res.json({
          token: accessToken,
          user: {
            username: result[0].username,
            email: result[0].email,
            role: result[0].role,
            id: result[0].id,
            firstName: result2[0].firstName,
            lastName: result2[0].lastName,
            address: result2[0].address,
            country: result2[0].country,
            phone: result2[0].phone,
          },
        });
      });
    });
  });
});

router.get("/user", validateToken, (req, res) => {
  res.json(req.user);
});

router.put("/changeUserSettings", validateToken, async (req, res) => {
  const user = req.body;
  const userQuery = "SELECT * FROM user where username=?";
  conection.query(userQuery, [req.user.username], async (err, result) => {
    if (err) return res.json({ error: err.message });
    let isUserDuplicated;
    let isEmailDuplicated;
    try {
      isUserDuplicated = await doesUserExist(user.username);
      isEmailDuplicated = await doesEmailExist(user.email);
    } catch (err) {
      console.log(err.message);
    }
    if (isUserDuplicated) {
      if (result[0].username !== isUserDuplicated.username)
        return res.json({ error: "This username already exists!" });
    }
    if (isEmailDuplicated) {
      if (result[0].email !== isEmailDuplicated.email)
        return res.json({ error: "This email already exists!" });
    }
    if (user.oldPassword) {
      bcrypt.compare(user.oldPassword, result[0].password).then((match) => {
        if (!match) return res.json({ error: "Wrong password entered!" });
        bcrypt.hash(user.newPassword, 10).then((hash) => {
          const updataUser =
            "UPDATE user SET password=?, username=?, email=? where id=?;";
          conection.query(
            updataUser,
            [hash, user.username, user.email, result[0].id],
            (err, result2) => {
              if (err) return res.json({ error: err.message });
              res.json("SUCCESS");
            }
          );
        });
      });
    } else {
      const updataUser = "UPDATE user SET username=?, email=? where id=?;";
      conection.query(
        updataUser,
        [user.username, user.email, result[0].id],
        (err, result2) => {
          if (err) return res.json({ error: err.message });
          res.json("SUCCESS");
        }
      );
    }
  });
});

router.put("/changeProfileSettings", validateToken, (req, res) => {
  const user = req.body;
  const profileQuery = "SELECT * FROM profile where id=?";
  conection.query(profileQuery, [req.user.id], (err, result) => {
    if (err) return res.json({ error: err.message });
    const updataProfile =
      "UPDATE profile SET firstName=?, lastName=?, address=?, country=?, phone=? where id=?;";
    conection.query(
      updataProfile,
      [
        user.firstName,
        user.lastName,
        user.address,
        user.country,
        user.phone,
        result[0].id,
      ],
      (err, result1) => {
        if (err) return res.json({ error: err.message });
        res.json("SUCCESS");
      }
    );
  });
});

function doesUserExist(user) {
  const duplicate = "SELECT * FROM user where username=?";
  return new Promise((resolve, reject) => {
    conection.query(duplicate, [user], (err, result) => {
      if (err) throw err;
      resolve(result[0]);
    });
  });
}

function doesEmailExist(email) {
  const duplicate = "SELECT * FROM user where email=?";
  return new Promise((resolve, reject) => {
    conection.query(duplicate, [email], (err, result) => {
      if (err) throw err;
      resolve(result[0]);
    });
  });
}

module.exports = router;
