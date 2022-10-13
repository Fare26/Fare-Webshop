const express = require("express");
const router = express.Router();
const conection = require("../database/connection");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", (req, res) => {
  conection.query("SELECT * FROM `product-category`", (err, result) => {
    if (err) return res.json({ error: err.message });
    conection.query("SELECT * FROM `brend-category`", (err, result1) => {
      if (err) return res.json({ error: err.message });
      conection.query("SELECT * FROM category", (err, result2) => {
        if (err) return res.json({ error: err.message });
        res.json({
          genderCategory: result2,
          brendCategory: result1,
          productCategory: result,
        });
      });
    });
  });
});

module.exports = router;
