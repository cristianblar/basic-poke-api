module.exports = function (req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  res.set('Cache-Control', 'public, max-age=86400, must-revalidate');

  next();
};
