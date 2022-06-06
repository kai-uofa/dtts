import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

const { NOT_FOUND } = StatusCodes

/* Redirect to Index for 404 requests */
function redirectToIndex(req: Request, res: Response) : any {
    res.redirect('/', NOT_FOUND);
    return;
}

export { redirectToIndex };