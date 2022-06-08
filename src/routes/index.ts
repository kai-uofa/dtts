import StatusCodes from 'http-status-codes';
import express, { Router, Request, Response, NextFunction } from 'express';

const router = Router();
const { OK } = StatusCodes;

/* GET home page. Instruction for using this API */
router.get('/', function (req: Request, res: Response, next: NextFunction) {

    return res.status(OK).json(
        { message: 'Welcome to DTTS api' }
    );
});

export default router;
