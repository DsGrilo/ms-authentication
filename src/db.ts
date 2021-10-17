// ARQUIVO RESPONSÁVEL PELA CONFIGURAÇÃO DO BANCO 

import { Pool } from "pg";


const connectionString = 'postgres://qmyioiei:y0ZHTESRWYry8RFOfYwVpzdymUSgqzcC@fanny.db.elephantsql.com/qmyioiei';

const db = new Pool({
    connectionString
})

export default db;