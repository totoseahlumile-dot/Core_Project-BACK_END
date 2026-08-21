import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden. Insufficient permissions.' });
    }
    next();
  };
};

export const restrictNonHrAccess = (req, res, next) => {
  const isHr = String(req.user?.role || '').toUpperCase().includes('HR');
  if (isHr) return next();

  const readOnlyPaths = ['/employees', '/leave-requests', '/leave-types', '/payroll', '/payslips', '/employee-settings', '/attendance'];
  const isAllowedRead = req.method === 'GET' && readOnlyPaths.some(
    (path) => req.path === path || req.path.startsWith(`${path}/`)
  );
  const isOwnLeaveSubmission = req.method === 'POST' && req.path === '/leave-requests';
  const isOwnSettingsWrite = ['POST', 'PUT', 'DELETE'].includes(req.method)
    && (req.path === '/employee-settings' || req.path.startsWith('/employee-settings/'));
  const isClockAction = req.method === 'POST'
    && ['/attendance/clock-in', '/attendance/clock-out'].includes(req.path);

  if (isAllowedRead || isOwnLeaveSubmission || isOwnSettingsWrite || isClockAction) return next();
  return res.status(403).json({ error: 'Non-HR employees may only access time-off requests and their own payslips.' });
};
