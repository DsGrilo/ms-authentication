import express, { Request, Response, NextFunction } from 'express';
import errorHandler from './middlewares/error.handler.middleware';
import authorizationRoute from './routes/authorization.routes';
import statusRoutes from './routes/status.routes';
import usersRoute from './routes/users.routes';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';


// gerenciador de rotas que permite fazer req e res via http
const app = express ();

// Configurações da Aplicação - 
app.use(express.json());
       // utilizado para entender Query String e outros
app.use(express.urlencoded({ extended: true}));



// ROTAS -

app.use(statusRoutes);

app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);

app.use(usersRoute);




// ERRORS HANDLINGS

app.use(errorHandler);






/*   INICIALIZAÇÃO DO SERVIÇO        */

const url = 'http://localhost';
const port = 3000;


app.listen(3000, () => { 
    console.log(`Application running in ${url}:${port}`);
});

console.log("Executed ")