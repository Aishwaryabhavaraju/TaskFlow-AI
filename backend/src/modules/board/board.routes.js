const express = require("express");

const router = express.Router();

const { protect } =
require("../auth/auth.middleware");

const {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  createColumn,
  updateColumn,
  deleteColumn,
} = require("./board.controller");

const {
  createBoardValidation,
} = require("./board.validation");

router.post(
  "/",
  protect,
  createBoardValidation,
  createBoard
);

router.get(
  "/",
  protect,
  getBoards
);

router.get(
  "/:id",
  protect,
  getBoard
);

router.put(
  "/:id",
  protect,
  updateBoard
);

router.delete(
  "/:id",
  protect,
  deleteBoard
);

router.post(
  "/:id/columns",
  protect,
  createColumn
);

router.put(
  "/:id/columns/:columnId",
  protect,
  updateColumn
);

router.delete(
  "/:id/columns/:columnId",
  protect,
  deleteColumn
);

module.exports = router;