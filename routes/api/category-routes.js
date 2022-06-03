const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!allCategoryData) {
      res.status(404).json({ message: "No categories found." });
      return;
    }
    res.status(200).json(allCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleCategoryData) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.category_name) {
      const postResponse = await Category.create(
        { category_name: req.body.category_name },
        { fields: ["category_name"] }
      );
      if (!postResponse) {
        res.status(400).json({ message: "Category was not added." });
        return;
      }
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

router.delete("/:id", async (req, res) => {
  try {
    const deleteResponse = await Category.destroy({
      where: {
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
