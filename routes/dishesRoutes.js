const express = require("express");

const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

const {
  getDish,
  shareFood,
  deleteDish,
  editFormDish,
  updateDish,
} = require("../controllers/dishes");

router.get("/:id", getDish);
router.use(isAuthenticated);
router.get("/new", shareFood);
router.get("/:id/edit", editFormDish);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

module.exports = router;
