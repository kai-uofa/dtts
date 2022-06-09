import StatusCodes from 'http-status-codes';
import express, { Router, Request, Response, NextFunction } from 'express';

const router = Router();
const { OK } = StatusCodes;

/* GET home page. Instruction for using this API */
router.get('/', function (req: Request, res: Response, next: NextFunction) {

    return res.status(OK).json({
        title: "Welcome to DTTS api",
        description: "A simple DateTime API using TypeScript",
        days_endpoint: "`.../days` returns the number of days between 2 given dates",
        wdays_endpoint: "`.../wdays` which returns the number of weekdays between 2 given dates",
        weeks_endpoint: "`.../weeks` which returns the number of complete weeks between 2 given dates",
        accepted_params: {
            startDate: "Madatory, in standard datetime format (ISO 8601)",
            endDate: "Optional, in standard datetime format (ISO 8601)",
            convertUnit: "Optional, accept only 'seconds', 'minutes', 'hours', or 'years'",
        }
    });
});

export default router;
