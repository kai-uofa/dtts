import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  return res.status(200).json(
    { message: 'Welcome to DTTS api' }
  );
});

export default router;
