import StatusCodes from 'http-status-codes';
import express, { Router, Request, Response, NextFunction } from 'express';

const router = Router();
const { OK } = StatusCodes;

/* GET days. Find number of days beetween 2 dates */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  return res.status(OK).json(
    { days: 'number of days beetween 2 dates' }
  );
});

export default router;