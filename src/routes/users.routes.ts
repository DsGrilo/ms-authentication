import { Router, Request, Response, NextFunction } from "express";
import  statusCodes from "http-status-codes";
import errorHandler from "../middlewares/error.handler.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

usersRoute.get('/users', errorHandler , async (req: Request, res: Response, next: NextFunction) => {
        
        try {
           const users = await userRepository.findAllUsers();

           res.status(statusCodes.OK).send(users);       
        } catch (error) {
           next(error);
        }

});

usersRoute.get('/users/:uuid', errorHandler , async  (req: Request<{ uuid:string}>, res: Response, next: NextFunction) => {
        
        try {
            
           const uuid = req.params.uuid;
        
           const user = await userRepository.findById(uuid);

           res.status(statusCodes.OK).send(user);     
        } catch (error) {

           next(error);
        }
});

usersRoute.post('/users', errorHandler , async (req: Request, res: Response, next: NextFunction) => {
    try{    

        const newUser= req.body;
        
        const uuid = await userRepository.createUser(newUser);

        res.status(statusCodes.CREATED).send(uuid);
    }catch(error){
        next(error)
    }
})


usersRoute.put('/users/:uuid', errorHandler , async (req: Request<{ uuid:string}>, res: Response, next: NextFunction) => {
    try{
        
        const uuid = req.params.uuid;

        const modifiedUser = req.body;
        
        modifiedUser.uuid = uuid;

        await userRepository.updateUser(modifiedUser);

        res.status(statusCodes.OK).send();
    }catch(error){
        next(error);
    }

});


usersRoute.delete('/users/:uuid', errorHandler , async (req: Request<{ uuid:string}>, res: Response, next: NextFunction) => {
    try { 
        const uuid = req.params.uuid;

        await userRepository.removeUser(uuid);

        res.status(statusCodes.OK).send();
    }catch(error){
        next(error);
    }

})











export default usersRoute;