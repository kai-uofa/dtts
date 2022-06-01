import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express();

/* GET weekdays. Find number of weekdays beetween 2 dates */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  return res.status(200).json(
    { weekdays: 'Number of weekdays beetween 2 dates' }
  );
});

export default router;