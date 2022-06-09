import StatusCodes from 'http-status-codes';
import express, { Router, Request, Response, NextFunction } from 'express';
import { validateParameters, validateRequest } from '../services/inputParameterValidation';

const router = Router();
const { OK } = StatusCodes;

/* GET days. Find number of days beetween 2 dates */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    const requestStatus = validateRequest(req);
    if (requestStatus !== OK) {
        return res.status(requestStatus).json({
            error: "Bad Request"
        });
    }
    
    const parametersStatus : any = validateParameters(req);
    if (parametersStatus.status !== OK) {
        return res.status(parametersStatus.status).json({
            error: "Bad Parameter"
        });
    }
    
    // call calculation
    

    return res.status(requestStatus).json({
        error: requestStatus
    });
});

export default router;