import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const statusRoutes = Router();




statusRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send({ Health: 'OK'});
});


export default statusRoutes