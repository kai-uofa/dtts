import StatusCodes from 'http-status-codes';
import { Router, Request, Response, NextFunction } from 'express';
import IndexObject from '../services/index'

const router = Router();
const { OK } = StatusCodes;

/* GET home page. Instruction for using this API */
router.get('/', function (req: Request, res: Response, next: NextFunction) {

    return res.status(OK).json(IndexObject.intro);
});

export default router;
