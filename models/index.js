const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");
Category.hasMany(Product, {
  foreignKey: "category_id",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, {
  through: { model: ProductTag, unique: false },
  as: "products_in_category",
});

Tag.belongsToMany(Product, {
  through: { model: ProductTag, unique: false },
  as: "tags_in_product",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
