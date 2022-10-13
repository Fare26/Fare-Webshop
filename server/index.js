const express = require("express");
const cors = require("cors");
const conection = require("./database/connection");
const app = express();
const bcrypt = require("bcryptjs");
require("dotenv").config();
const port = 3500;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);
const categoryRouter = require("./routes/Category");
app.use("/category", categoryRouter);
const productsRouter = require("./routes/Products");
app.use("/products", productsRouter);
const cartRouter = require("./routes/Cart");
app.use("/cart", cartRouter);
app.listen(process.env.port || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
