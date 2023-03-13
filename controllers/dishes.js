const client = require("../db/connect");
const asyncWrapper = require("../middleware/asyncWrapper");
const {
  selectSQL,
  selectById,
  deleteById,
  updateById,
} = require("../db/queries");

const getAllDishes = asyncWrapper(async (req, res) => {
  const dbRes = await client.query(selectSQL);
  const data = dbRes.rows;
  res.render("index", { data });
});

const getDish = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const dbRes = await client.query(selectById, [id]);
  const data = dbRes.rows[0];
  const { title, img_url } = data;

  res.render("dish", { id, title, img_url });
});

const deleteDish = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const dbRes = await client.query(deleteById, [id]);
  if (dbRes.rowCount === 1) {
    res.redirect("/");
  }
});

const editFormDish = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const dbRes = await client.query(selectById, [id]);
  const data = dbRes.rows[0];
  const { title, img_url } = data;

  res.render("editForm", { id, title, img_url });
});

const updateDish = asyncWrapper(async (req, res) => {
  const { title, img } = req.body;
  const { id } = req.params;

  const dbRes = await client.query(updateById, [title, img, id]);
  if (dbRes.rowCount === 1) {
    res.redirect(`/dishes/${id}`);
  }
});

const shareFood = (req, res) => {
  res.status(200).render("share");
};

module.exports = {
  getAllDishes,
  getDish,
  shareFood,
  deleteDish,
  updateDish,
  editFormDish,
};
