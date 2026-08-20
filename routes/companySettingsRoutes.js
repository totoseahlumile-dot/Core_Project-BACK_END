import express from 'express';
import {
  getCompanySettings,
  getCompanySetting,
  addCompanySetting,
  editCompanySetting,
  removeCompanySetting,
} from '../controllers/companySettingsController.js';
import { validateId, validateCompanySetting } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getCompanySettings);
router.get('/:id', validateId, getCompanySetting);
router.post('/', validateCompanySetting, addCompanySetting);
router.put('/:id', validateId, validateCompanySetting, editCompanySetting);
router.delete('/:id', validateId, removeCompanySetting);

export default router;