const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const result = await boardsService.getById(req.params.boardId);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json(Board.toResponse(result.board));
  }
});

router.route('/').post(async (req, res) => {
  const newBoard = new Board(req.body);

  const result = await boardsService.createBoard(newBoard);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json(result.board);
  }
});

router.route('/:boardId').put(async (req, res) => {
  const result = await boardsService.updateBoard(req.params.boardId, req.body);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json({ message: result.message });
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const result = await boardsService.deleteBoard(req.params.boardId);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json({ message: result.message });
  }
});

module.exports = router;
