const Task = require('../models/Task');
const { publishEvent } = require('../services/rabbitService');

exports.getTasks = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];

    const tasks = await Task.find({ userId });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const { title } = req.body;

    const task = await Task.create({
      title,
      userId,
    });

    await publishEvent('events', 'task.created', {
      taskId: task._id.toString(),
      userId,
      title: task.title,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};