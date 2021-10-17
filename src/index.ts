import express, { Request, Response, NextFunction } from 'express';
import statusRoutes from './routes/status.routes';
import usersRoute from './routes/users.routes';


// gerenciador de rotas que permite fazer req e res via http
const app = express ();

// Configurações da Aplicação - 
app.use(express.json());
       // utilizado para entender Query String e outros
app.use(express.urlencoded({ extended: true}));



// ROTAS -
app.use(usersRoute);

app.use(statusRoutes);

















/*   CONFIGURING INFORMATIONS IN CONSOLE LOG        */

const url = 'http://localhost';
const port = 3000;


app.listen(3000, () => { 
    console.log(`Application running in ${url}:${port}`);
});

console.log("Executed ")