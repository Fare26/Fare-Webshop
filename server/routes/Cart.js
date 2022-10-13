const express = require("express");
const router = express.Router();
const conection = require("../database/connection");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/buy", validateToken, (req, res) => {
  const { items, user, cartDate } = req.body;
  const buyQuery =
    "INSERT INTO cart (userId,productId,quantity,date) VALUES (?,?,?,?)";
  const updateQtyQuery = "UPDATE product SET quantity=? where id=?";
  for (const item of items) {
    conection.query(
      buyQuery,
      [user.id, item.id, item.amount, cartDate],
      (err, result) => {
        if (err) return res.json({ error: err.message });
        conection.query(
          updateQtyQuery,
          [item.quantity - item.amount, item.id],
          (err, result) => {
            if (err) return res.json({ error: err.message });
          }
        );
      }
    );
  }
  res.json("SUCCESS");
});

router.post("/getUserCart", (req, res) => {
  const { id } = req.body;
  const cartQuery =
    "SELECT distinct product.title,product.price,product.image,cart.quantity,cart.date,cart.id FROM cart JOIN user on cart.userId = ? JOIN product on product.id = cart.productId;";
  conection.query(cartQuery, [id], (err, result) => {
    if (err) return res.json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;
