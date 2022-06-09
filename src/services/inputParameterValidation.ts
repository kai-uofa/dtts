import StatusCodes from 'http-status-codes';
import { Request } from 'express';

const { OK, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;

/* Check if request has correct params */
function validateRequest(req: Request): number {
    if (req.query.startDate === undefined) {
        return BAD_REQUEST;
    }

    const startDate = Date.parse(req.query.startDate.toString());
    if (isNaN(startDate) === true) {
        return BAD_REQUEST;
    }

    if (req.query.endDate !== undefined) {
        const endDate = Date.parse(req.query.endDate.toString());
        if (isNaN(endDate) === true) {
            return BAD_REQUEST;
        }
    }

    return OK;
}

/* Check if input parameters are correct */
function validateParameters(req: Request): any {
    const startDateStr = req.query.startDate !== undefined ? req.query.startDate.toString() : "invalidDateTimeFormat";
    const endDateStr = req.query.endDate !== undefined ? req.query.endDate.toString() : "undefined";
    const convertUnit = req.query.convertUnit !== undefined ? req.query.convertUnit.toString() : null;

    var status = OK;
    const startDate = Date.parse(startDateStr);
    var endDate: number;

    if (endDateStr === "undefined") {
        const currentTime = new Date();
        const debuf = currentTime.toISOString();
        endDate = Date.parse(currentTime.toISOString());
    } else {
        endDate = Date.parse(endDateStr);
    }
    

    if (isNaN(startDate) === true || isNaN(endDate) === true) {
        status = UNPROCESSABLE_ENTITY;
    }

    if (startDate > endDate) {
        status = UNPROCESSABLE_ENTITY;
    }

    return {
        status: status,
        startDate: startDate,
        endDate: endDate,
        convertUnit: convertUnit
    }
}

export { validateRequest, validateParameters };