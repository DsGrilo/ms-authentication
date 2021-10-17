import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbiddden.error.models";
import JWT, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import userRepository from "../repositories/user.repository";


import config from "config";
    

async function jwtAuthenticationMiddleware(req: Request, res: Response, next:NextFunction){
        const mySecretKey = config.get<string>('authentication.secretKey')
    
    try {

        const current_time = new Date().getTime() / 1000;



        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas ou inválidas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token) { 
            throw new ForbiddenError('Tipo de authenticação inválida ou inexistente');
        }

        const tokenPayload = JWT.verify(token, mySecretKey);


        
        try {

            

            if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
                throw new ForbiddenError('Token Inválido');
             }
            if(current_time > tokenPayload.exp!){
                throw new ForbiddenError("Token Expirado");
            }

               const user = {
               uuid: tokenPayload.sub,
               username: tokenPayload.username
               };
               
               req.user = user;
            
               next();
        } catch (error) {
            throw new ForbiddenError('Token Inválido'); 
        }
    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;