// middlewares/validator.js
import { query, body, validationResult } from 'express-validator';

export const validateQuery = (type) => {
  if (type === 'getProblems') {
    return [
      query('page').optional().isInt({ min: 1 }),
      query('limit').optional().isInt({ min: 1, max: 100 }),
      query('solved').optional().isIn(['true', 'false']),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });
        next();
      }
    ];
  }
  if (type === 'getProblemById') {
    return [
      (req, res, next) => { if (!req.params.id) return res.status(400).json({ success:false, message: 'id required' }); next(); }
    ];
  }
  return [];
};

export const validateBody = (type) => {
  if (type === 'submitFlag') {
    return [
      body('flag').isString().notEmpty(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });
        next();
      }
    ];
  }
  if (type === 'requestHint') {
    return [
      body('stage').optional().isInt({ min: 1 }),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });
        next();
      }
    ];
  }
  return [];
};
