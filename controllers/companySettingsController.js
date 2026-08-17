import * as CompanySettings from '../models/companySettingsModel.js';

export const getCompanySettings = async (req, res, next) => {
  try {
    const settings = await CompanySettings.getAllCompanySettings();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const getCompanySetting = async (req, res, next) => {
  try {
    const setting = await CompanySettings.getCompanySettingById(req.params.id);
    if (!setting) return res.status(404).json({ error: 'Company setting not found' });
    res.json(setting);
  } catch (err) {
    next(err);
  }
};

export const addCompanySetting = async (req, res, next) => {
  const { setting_key, setting_value } = req.body;
  if (!setting_key || !setting_value) {
    return res.status(400).json({ error: 'Setting key and value are required' });
  }

  try {
    const id = await CompanySettings.createCompanySetting(req.body);
    res.status(201).json({ setting_id: id, message: 'Company setting created' });
  } catch (err) {
    next(err);
  }
};

export const editCompanySetting = async (req, res, next) => {
  try {
    const affected = await CompanySettings.updateCompanySetting(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Company setting not found' });
    res.json({ message: 'Company setting updated' });
  } catch (err) {
    next(err);
  }
};

export const removeCompanySetting = async (req, res, next) => {
  try {
    const affected = await CompanySettings.deleteCompanySetting(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Company setting not found' });
    res.json({ message: 'Company setting deleted' });
  } catch (err) {
    next(err);
  }
};
