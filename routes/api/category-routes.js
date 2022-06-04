const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

// get all categories
router.get("/", async (req, res) => {
  try {
    // the response from mySQL gets stored in a const to be sent back to the user if all goes well
    const allCategoryData = await Category.findAll({
      // this includes a join that uses products' category IDs to group matching products into each category object
      include: [{ model: Product }],
    });
    // responds back to the client with the requested data
    res.status(200).json(allCategoryData);
  } catch (err) {
    // sends an error object with a 500 code to the client if an error is caught
    res.status(500).json(err);
  }
});

// get one category by id
router.get("/:id", async (req, res) => {
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleCategoryData) {
      // if the data that gets sent back is empty, it's assumed that the resource is missing and we send back a response to the user with a
      // verbose message to that effect
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    // responds back to the client with the requested data
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a category
router.post("/", async (req, res) => {
  try {
    if (req.body.category_name) {
      const postResponse = await Category.create(
        { category_name: req.body.category_name },
        // the "fields" property defines what properties can be added in this post
        { fields: ["category_name"] }
      );
      // responds back to the client with the inserted data, including the auto-incremented id row
      res.status(200).json(postResponse);
    } else {
      res.status(400).json({
        message:
          "The client didn't specify a category in the body, or didn't label the property correctly",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// change a category by id
router.put("/:id", async (req, res) => {
  try {
    if (req.body.category_name) {
      const putResponse = await Category.update(
        { category_name: req.body.category_name },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      // gives the client a 404 response if a missing resource is requested for update
      if (!putResponse) {
        res.status(404).json({ message: "No category found with this id." });
        return;
      }
      res.status(200).json(putResponse);
    } else {
      res.status(400).json({
        message:
          "The client didn't include content in the body, or didn't label the property correctly",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteResponse = await Category.destroy({
      where: {
        // pulls the id parameter out of the req object and uses it in the query to find and delete the row
        id: req.params.id,
      },
    });
    if (!deleteResponse) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json(deleteResponse);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
