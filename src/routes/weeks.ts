import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express();

/* GET weeks. Find number of complete weeks beetween 2 dates */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  return res.status(200).json(
    { weeks: 'Number of complete weeks beetween 2 dates' }
  );
});

export default router;