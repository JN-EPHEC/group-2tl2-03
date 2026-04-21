import type { Request, Response, NextFunction } from 'express';
interface HttpError extends Error {
  status?: number;
}

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${err.message}`);
  const status = err.status || 500;
  const message = err.message || "Une erreur interne est survenue.";
  res.status(status).json({
    error: {
      message: message,
      status: status
    }
  });
};