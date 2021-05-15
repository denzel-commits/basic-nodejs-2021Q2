const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const result = await usersService.getById(req.params.id);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json(User.toResponse(result.user));
  }
});

router.route('/').post(async (req, res) => {
  const newUser = new User(req.body);

  const result = await usersService.createUser(newUser);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json(User.toResponse(result.user));
  }
});

router.route('/:id').put(async (req, res) => {
  const result = await usersService.updateUser(req.params.id, req.body);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json({ message: result.message });
  }
});

router.route('/:id').delete(async (req, res) => {
  const result = await usersService.deleteUser(req.params.id);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json({ message: result.message });
  }
});

module.exports = router;
