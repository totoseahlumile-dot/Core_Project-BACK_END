import * as AuditLog from '../models/auditLogModel.js';

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.getAllAuditLogs();
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

export const getAuditLog = async (req, res, next) => {
  try {
    const log = await AuditLog.getAuditLogById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Audit log not found' });
    res.json(log);
  } catch (err) {
    next(err);
  }
};

export const addAuditLog = async (req, res, next) => {
  try {
    const id = await AuditLog.createAuditLog(req.body);
    res.status(201).json({ audit_id: id, message: 'Audit log created' });
  } catch (err) {
    next(err);
  }
};

export const editAuditLog = async (req, res, next) => {
  try {
    const affected = await AuditLog.updateAuditLog(req.params.id, req.body);
    if (!affected) return res.status(404).json({ error: 'Audit log not found' });
    res.json({ message: 'Audit log updated' });
  } catch (err) {
    next(err);
  }
};

export const removeAuditLog = async (req, res, next) => {
  try {
    const affected = await AuditLog.deleteAuditLog(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Audit log not found' });
    res.json({ message: 'Audit log deleted' });
  } catch (err) {
    next(err);
  }
};
