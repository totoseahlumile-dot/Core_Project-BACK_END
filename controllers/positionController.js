import * as Position from '../models/positionModel.js';

export const getPositions = async (req, res, next) => {
  try {
    const positions = await Position.getAllPositions();
    res.json(positions);
  } catch (err) {
    next(err);
  }
};

export const getPosition = async (req, res, next) => {
  try {
    const position = await Position.getPositionById(req.params.id);
    if (!position) return res.status(404).json({ error: 'Position not found' });
    res.json(position);
  } catch (err) {
    next(err);
  }
};

export const addPosition = async (req, res, next) => {
  const { department_id, position_title, description } = req.body;

  if (!department_id || !position_title) {
    return res.status(400).json({ error: 'Department ID and position title are required' });
  }

  try {
    const id = await Position.createPosition({ department_id, position_title, description });
    res.status(201).json({ position_id: id, message: 'Position created' });
  } catch (err) {
    next(err);
  }
};

export const editPosition = async (req, res, next) => {
  try {
    const affected = await Position.updatePosition(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Position not found' });
    res.json({ message: 'Position updated' });
  } catch (err) {
    next(err);
  }
};

export const removePosition = async (req, res, next) => {
  try {
    const affected = await Position.deletePosition(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Position not found' });
    res.json({ message: 'Position deleted' });
  } catch (err) {
    next(err);
  }
};
