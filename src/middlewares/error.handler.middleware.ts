import { Request, Response, NextFunction } from "express";
import DatabaseError from "../models/errors/database.error.model";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../models/errors/forbiddden.error.models";


function errorHandler(error: any, req:Request, res:Response, next:NextFunction) { 
    if(error instanceof DatabaseError){
        res.sendStatus(StatusCodes.BAD_REQUEST);
   } else if (error instanceof ForbiddenError){
        res.sendStatus(StatusCodes.UNAUTHORIZED);
   }
   else{ 
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);    
   } 
}

export default errorHandler;
