import StatusCodes from 'http-status-codes';
import express, { Router, Request, Response, NextFunction } from 'express';
import { validateParameters, validateRequest } from '../services/inputParameterValidation';
import { getDifferentDaysBetweenTwoDates } from '../services/days';

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
    
    const result: object = getDifferentDaysBetweenTwoDates(parametersStatus.startDate, parametersStatus.endDate, parametersStatus.convertUnit);

    return res.status(OK).json(result);
});

export default router;