import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: 'Leave requests table is not yet implemented in the database schema.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
