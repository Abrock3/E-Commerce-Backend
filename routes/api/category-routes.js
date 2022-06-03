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
      await Category.create(
        { category_name: req.body.category_name },
        { fields: ["category_name"] }
      );
      res.status(200).json({ message: "Category created." });
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
      await Category.update(
        { category_name: req.body.category_name },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: `Category number ${req.params.id} updated to ${req.body.category_name}.`,
      });
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
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ message: `Category number ${req.params.id} has been deleted.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
