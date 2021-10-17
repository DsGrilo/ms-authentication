import express, { Request, Response, NextFunction } from 'express';

// gerenciador de rotas que permite fazer req e res via http
const app = express ();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({ foo: 'bar'});
});


app.listen(3000, () => { 
    console.log("Application executing in port 3000")
})

console.log("Executed")