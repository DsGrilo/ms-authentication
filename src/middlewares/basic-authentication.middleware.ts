import { Request, Response, NextFunction } from "express"
import ForbiddenError from "../models/errors/forbiddden.error.models";
import userRepository from "../repositories/user.repository";


 async function  basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        // pega a autorização do Header do pedido
        const authorizationHeader = req.headers['authorization'];

        // Se não houver authorization 
        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais incorretas ou não informada');
        }

        // separa a authorization em duas partes tipo de auth e o token64
        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Autenticação Inválida ou Inexistente');
        }

        // Convert de Base64 para utf-8 expondo o username e senha 
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        // separando o username da senha 
        const [ username, password ] =  tokenContent.split(':');

        if(!username || !password){
            throw new ForbiddenError('Autenticação Inválida ou Inexistente');
        }

        const user = await userRepository.findByIdUsernameandPassword(username, password)

        if(!user){
            throw new ForbiddenError('Usuário ou senha ínvalidos')
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
 }
 export default basicAuthenticationMiddleware