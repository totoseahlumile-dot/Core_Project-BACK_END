import express from 'express';
import {
  getCompanySettings,
  getCompanySetting,
  addCompanySetting,
  editCompanySetting,
  removeCompanySetting,
} from '../controllers/companySettingsController.js';

const router = express.Router();

router.get('/', getCompanySettings);
router.get('/:id', getCompanySetting);
router.post('/', addCompanySetting);
router.put('/:id', editCompanySetting);
router.delete('/:id', removeCompanySetting);

export default router;
