const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  try {
    const allProductData = await Product.findAll({
      // this line of code will create joins in the SQL query that will include Tag and Category data, matched from tag_id and category_id
      include: [{ model: Category }, { model: Tag }],
    });
    // if no errors are encountered (triggering the catch), then this will send the product data back to the user
    res.status(200).json(allProductData);
  } catch (err) {
    // sends an error object with a 500 code to the client if an error is caught
    res.status(500).json(err);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const singleProductData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!singleProductData) {
      // if the data that gets sent back is empty, it's assumed that the resource is missing and the server responds to the user with a
      // verbose message to that effect
      res.status(404).json({ message: "No product found with this id." });
    }
    // responds back to the client with the requested data
    res.status(200).json(singleProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteResponse = await Product.destroy({
      where: {
        // pulls the id parameter out of the req object and uses it in the query to find and delete the row
        id: req.params.id,
      },
    });
    // gives a descriptive response if the client requested a missing resource
    if (!deleteResponse) {
      res.status(404).json({ message: "No product found with this id." });
      return;
    }
    res.status(200).json(deleteResponse);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
