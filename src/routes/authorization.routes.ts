import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbiddden.error.models";
import  JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";


const authorizationRoute = Router();



authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        
        const user = req.user;

        if(!user){
            throw new ForbiddenError('Usuárion não informado');
        }


        const jwtPayload = { username: user!.username};
        const jwtOptions:SignOptions = { subject: user?.uuid, expiresIn: '1m'};
        const secretKey = 'my_secret_key'

        const jwt = JWT.sign(jwtPayload , secretKey , jwtOptions);
        res.status(StatusCodes.OK).json({ token: jwt });

        next();
    } catch (error) {
        next(error);
    }
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})  





export default authorizationRoute;