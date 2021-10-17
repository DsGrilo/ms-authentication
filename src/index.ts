import express, { Request, Response, NextFunction } from 'express';
import basicAuthenticationMiddleware from './middlewares/basic-authentication.middleware';
import bearerAuthenticationMiddleware from './middlewares/bearer-authentication.middleware';
import errorHandler from './middlewares/error.handler.middleware';
import authorizationRoute from './routes/authorization.routes';
import statusRoutes from './routes/status.routes';
import usersRoute from './routes/users.routes';


// gerenciador de rotas que permite fazer req e res via http
const app = express ();

// Configurações da Aplicação - 
app.use(express.json());
       // utilizado para entender Query String e outros
app.use(express.urlencoded({ extended: true}));



// ROTAS -
app.use(bearerAuthenticationMiddleware ,usersRoute);

app.use(statusRoutes);

app.use(authorizationRoute);

// ERRORS HANDLINGS

app.use(errorHandler);






/*   INICIALIZAÇÃO DO SERVIÇO        */

const url = 'http://localhost';
const port = 3000;


app.listen(3000, () => { 
    console.log(`Application running in ${url}:${port}`);
});

console.log("Executed ")