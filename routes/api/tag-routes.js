const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (!allTagData) {
      res.status(404).json({ message: "No tags found!" });
      return;
    }
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleTagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.tag_name) {
      await Tag.create(
        { tag_name: req.body.tag_name },
        { fields: ["tag_name"] }
      );
      res.status(200).json({ message: "Tag created!" });
    } else {
      res.status(400).json({
        message:
          "The client didn't specify a tag in the body, or didn't label the attribute as 'tag_name'",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
