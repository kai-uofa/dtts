import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

const { PERMANENT_REDIRECT } = StatusCodes

/* Redirect to Index for 404 requests */
function redirectToIndex(req: Request, res: Response) : any {
    res.redirect(PERMANENT_REDIRECT, '/');
    return;
}

export { redirectToIndex };