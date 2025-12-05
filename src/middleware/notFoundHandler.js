import httpError from 'http-errors';

export function notFoundHandler(req, res, next) {
  next(httpError(404, 'Route not found'));
}
