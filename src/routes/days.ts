import StatusCodes from 'http-status-codes';
import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../services/inputParameterValidation';
import { getNumberOfDaysBetweenTwoDates } from '../services/days';

const router = Router();
const { OK } = StatusCodes;

/* GET days. Find number of days beetween 2 dates */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    const requestValidation: any = validateRequest(req);
    if (requestValidation.status !== OK) {
        return res.status(requestValidation.status).json(requestValidation.error);
    }
    
    const validatedParams: any = requestValidation.params;
    const result: object = getNumberOfDaysBetweenTwoDates(validatedParams.startDate, validatedParams.endDate, validatedParams.convertUnit);

    return res.status(OK).json(result);
});

export default router;