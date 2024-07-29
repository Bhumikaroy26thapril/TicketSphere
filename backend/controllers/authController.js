const admin = require('firebase-admin');

// Middleware to check authentication
exports.checkAuth = async (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
