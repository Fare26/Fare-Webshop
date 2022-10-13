const express = require("express");
const router = express.Router();
const conection = require("../database/connection");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/addProduct", (req, res) => {
  const product = req.body;
  conection.query(
    "SELECT id FROM `category` where genderName=?",
    [product.genderName],
    (err, result) => {
      if (err) return res.json({ error: err.message });
      conection.query(
        "SELECT id FROM `product-category` where productName=?",
        [product.productName],
        (err, result1) => {
          if (err) return res.json({ error: err.message });
          conection.query(
            "SELECT id FROM `brend-category` where brendName=?",
            [product.brendName],
            (err, result2) => {
              if (err) return res.json({ error: err.message });
              const postProductQuery =
                "INSERT INTO product (title,description,price,quantity,action,image,categoryId,brendCategoryId,productCategoryId) VALUES (?,?,?,?,?,?,?,?,?)";
              conection.query(
                postProductQuery,
                [
                  product.title,
                  product.description,
                  +product.price,
                  +product.quantity,
                  +product.action,
                  product.image,
                  result[0].id,
                  result2[0].id,
                  result1[0].id,
                ],
                (err, result3) => {
                  if (err) return res.json({ error: err.message });
                  res.json("SUCCESS");
                }
              );
            }
          );
        }
      );
    }
  );
});

router.get("/getAllProducts", (req, res) => {
  const productsQuery =
    "SELECT product.id,product.title,product.description,product.price,product.quantity,product.action,product.image,category.genderName,`brend-category`.brendName,`product-category`.productName FROM product JOIN category on category.id = product.categoryId JOIN `brend-category` on `brend-category`.id = product.brendCategoryId JOIN `product-category` on `product-category`.id = product.productCategoryId order by product.id;";
  conection.query(productsQuery, async (err, result) => {
    if (err) return res.json({ error: err.message });
    res.json(result);
  });
});

router.post("/getFilteredProducts", (req, res) => {
  const { arr1, arr2, arr3, minPrice, maxPrice, action } = req.body;
  const min = minPrice ? Number(minPrice) : 0;
  const max = maxPrice ? Number(maxPrice) : 1500;
  const productsQuery =
    "SELECT product.id,product.title,product.description,product.price,product.quantity,product.action,product.image,category.genderName,`brend-category`.brendName,`product-category`.productName FROM product JOIN category on category.id = product.categoryId JOIN `brend-category` on `brend-category`.id = product.brendCategoryId JOIN `product-category` on `product-category`.id = product.productCategoryId where product.price>=? and product.price<=?" +
    `${
      action
        ? " and product.action>0 order by product.id;"
        : " order by product.id;"
    }`;
  conection.query(productsQuery, [min, max], async (err, result) => {
    if (err) return res.json({ error: err.message });
    let filteredArr = [];
    if (arr1.length === 0 && arr2.length === 0 && arr3.length === 0)
      return res.json(result);
    if (arr1.length !== 0 && arr2.length !== 0 && arr3.length !== 0) {
      let arr = [];
      for (const item1 of arr1) {
        for (const item2 of arr2) {
          for (const item3 of arr3) {
            const resFilterered = result.filter(
              (item) =>
                item.productName === item1.productName &&
                item.brendName === item2.brendName &&
                item.genderName === item3.genderName
            );
            if (resFilterered.length !== 0) arr = [...arr, ...resFilterered];
          }
        }
      }
      return res.json(arr);
    } else if (arr1.length !== 0 && arr2.length !== 0 && arr3.length === 0) {
      let arr = [];
      for (const item1 of arr1) {
        for (const item2 of arr2) {
          const resFilterered = result.filter(
            (item) =>
              item.productName === item1.productName &&
              item.brendName === item2.brendName
          );
          if (resFilterered.length !== 0) arr = [...arr, ...resFilterered];
        }
      }
      return res.json(arr);
    } else if (arr1.length !== 0 && arr2.length === 0 && arr3.length !== 0) {
      let arr = [];
      for (const item1 of arr1) {
        for (const item3 of arr3) {
          const resFilterered = result.filter(
            (item) =>
              item.productName === item1.productName &&
              item.genderName === item3.genderName
          );
          if (resFilterered.length !== 0) arr = [...arr, ...resFilterered];
        }
      }
      return res.json(arr);
    } else if (arr1.length === 0 && arr2.length !== 0 && arr3.length !== 0) {
      let arr = [];
      for (const item2 of arr2) {
        for (const item3 of arr3) {
          const resFilterered = result.filter(
            (item) =>
              item.brendName === item2.brendName &&
              item.genderName === item3.genderName
          );
          if (resFilterered.length !== 0) arr = [...arr, ...resFilterered];
        }
      }
      return res.json(arr);
    } else if (arr1.length !== 0 && arr2.length === 0 && arr3.length === 0) {
      let arr = [];
      for (const item1 of arr1) {
        const resFilterered = result.filter(
          (item) => item.productName === item1.productName
        );
        if (resFilterered.length !== 0) arr = [...arr, ...resFilterered];
      }
      return res.json(arr);
    } else if (arr1.length === 0 && arr2.length !== 0 && arr3.length === 0) {
      let arr = [];
      for (const item2 of arr2) {
        const resFilterered = result.filter(
          (item) => item.brendName === item2.brendName
        );
        if (resFilterered.length !== 0) arr = [...arr, ...resFilterered];
      }
      return res.json(arr);
    } else if (arr1.length === 0 && arr2.length === 0 && arr3.length !== 0) {
      let arr = [];
      for (const item3 of arr3) {
        const resFilterered = result.filter(
          (item) => item.genderName === item3.genderName
        );
        if (resFilterered.length !== 0) arr = [...arr, ...resFilterered];
      }
      return res.json(arr);
    }
  });
});

router.post("/searchProduct", (req, res) => {
  const { name } = req.body;
  const searchQuery =
    "SELECT product.id,product.title,product.description,product.price,product.quantity,product.action,product.image,category.genderName,`brend-category`.brendName,`product-category`.productName FROM product JOIN category on category.id = product.categoryId JOIN `brend-category` on `brend-category`.id = product.brendCategoryId JOIN `product-category` on `product-category`.id = product.productCategoryId where product.title like" +
    ` '%${name}%' order by id;`;
  conection.query(searchQuery, (err, result) => {
    if (err) return res.json({ error: err.message });
    res.json(result);
  });
});

router.put("/updateProduct", (req, res) => {
  const { product } = req.body;
  conection.query(
    "SELECT id FROM `category` where genderName=?",
    [product.genderName],
    (err, result) => {
      if (err) return res.json({ error: err.message });
      conection.query(
        "SELECT id FROM `product-category` where productName=?",
        [product.productName],
        (err, result1) => {
          if (err) return res.json({ error: err.message });
          conection.query(
            "SELECT id FROM `brend-category` where brendName=?",
            [product.brendName],
            (err, result2) => {
              if (err) return res.json({ error: err.message });
              const productUpdateQuery =
                "UPDATE product SET title=?,description=?,price=?,quantity=?,action=?,image=?,categoryId=?,brendCategoryId=?,productCategoryId=? where id = ?; ";
              conection.query(
                productUpdateQuery,
                [
                  product.title,
                  product.description,
                  +product.price,
                  +product.quantity,
                  +product.action,
                  product.image,
                  result[0].id,
                  result2[0].id,
                  result1[0].id,
                  product.id,
                ],
                (err, result3) => {
                  if (err) return res.json({ error: err.message });
                  res.json("SUCCESS");
                }
              );
            }
          );
        }
      );
    }
  );
});

router.delete("/deleteProduct/:id", (req, res) => {
  conection.query(
    "DELETE FROM product where id=?;",
    [req.params.id],
    (err, result) => {
      if (err) return res.json({ error: err.message });
      res.json("SUCCESS");
    }
  );
});

module.exports = router;
