import StatusCodes from 'http-status-codes';
import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../services/inputParameterValidation';
import { getNumberOfCompleteWeeksBetweenTwoDates } from '../services/weeks';

const router = Router();
const { OK } = StatusCodes;

/* GET weeks. Find number of complete weeks between 2 dates */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    const requestValidation: any = validateRequest(req);
    if (requestValidation.status !== OK) {
        return res.status(requestValidation.status).json(requestValidation.error);
    }
    
    const validatedParams: any = requestValidation.params;
    const result: object = getNumberOfCompleteWeeksBetweenTwoDates(validatedParams.startDate, validatedParams.endDate, validatedParams.convertUnit);

    return res.status(OK).json(result);
});

export default router;