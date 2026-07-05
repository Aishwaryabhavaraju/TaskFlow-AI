const Board = require("../../models/Board");

const createBoard = async (data) => {
  return await Board.create(data);
};

const getBoards = async (projectId) => {
  return await Board.find({
    project: projectId,
    isDeleted: false,
  });
};

const getBoard = async (id) => {
  return await Board.findById(id);
};

const updateBoard = async (id, data) => {
  return await Board.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteBoard = async (id) => {
  return await Board.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

const createColumn = async (
  boardId,
  column
) => {

  return await Board.findByIdAndUpdate(
    boardId,
    {
      $push: {
        columns: column,
      },
    },
    {
      new: true,
    }
  );

};

const updateColumn = async (
  boardId,
  columnId,
  data
) => {

  const board =
    await Board.findById(boardId);

  const column =
    board.columns.id(columnId);

  Object.assign(column, data);

  await board.save();

  return board;

};

const deleteColumn = async (
  boardId,
  columnId
) => {

  const board =
    await Board.findById(boardId);

  board.columns.pull(columnId);

  await board.save();

  return board;

};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  createColumn,
  updateColumn,
  deleteColumn,
};