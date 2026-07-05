const Board = require("../../models/Board");
const boardService = require("./board.service");

exports.createBoard = async (req, res) => {

  const board = await boardService.createBoard({
    ...req.body,
  });

  res.status(201).json({
    success: true,
    message: "Board created successfully",
    data: board,
  });

};

exports.getBoards = async (req, res) => {

  const boards =
    await boardService.getBoards(req.query.project);

  res.status(200).json({
    success: true,
    data: boards,
  });

};

exports.getBoard = async (req, res) => {

  const board =
    await boardService.getBoard(req.params.id);

  if (!board) {

    return res.status(404).json({
      success: false,
      message: "Board not found",
    });

  }

  res.status(200).json({
    success: true,
    data: board,
  });

};

exports.updateBoard = async (req, res) => {

  const board =
    await boardService.updateBoard(
      req.params.id,
      req.body
    );

  res.status(200).json({
    success: true,
    data: board,
  });

};

exports.deleteBoard = async (req, res) => {

  await boardService.deleteBoard(req.params.id);

  res.status(200).json({
    success: true,
    message: "Board deleted successfully",
  });

};

exports.createColumn = async (
  req,
  res
) => {

  const board =
    await boardService.createColumn(
      req.params.id,
      req.body
    );

  res.status(201).json({
    success: true,
    message: "Column created successfully",
    data: board,
  });

};