import StatusCodes from 'http-status-codes';
import { Request } from 'express';

const { OK, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;

/* Get return object based on status code */
function getErrorReturnObject(status: number): object {
    if (status === BAD_REQUEST) {
        return {
            error: "Bad Request"
        };
    }

    if (status === UNPROCESSABLE_ENTITY) {
        return {
            error: "Bad Parameter"
        };
    }

    return {
        error: "Internal Error"
    };
}

/* Check if request has correct params */
function validateParameters(req: Request): number {
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
function validateParametersFormat(req: Request): object {
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
        params: {
            startDate: startDate,
            endDate: endDate,
            convertUnit: convertUnit
        }
    }
}

function validateRequest(req: Request): object {
    const paramsValidation = validateParameters(req);
    if (paramsValidation !== OK) {
        return {
            status: paramsValidation,
            error: getErrorReturnObject(paramsValidation)
        }
    }
    
    const paramsFormatValidation : any = validateParametersFormat(req);
    if (paramsFormatValidation.status !== OK) {
        return {
            status: paramsFormatValidation.status,
            error: getErrorReturnObject(paramsFormatValidation.status)
        }
    }

    return {
        status: OK,
        params: paramsFormatValidation.params
    }
}

export { validateRequest };