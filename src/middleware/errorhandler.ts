import { Request, Response } from 'express';

/* Redirect to Index for 404 requests */
export function redirectToIndex(req: Request, res: Response) : any {
    res.redirect('/');
    return;
}