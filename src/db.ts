// ARQUIVO RESPONSÁVEL PELA CONFIGURAÇÃO DO BANCO 

import { Pool } from "pg";
import config from 'config';


const connectionString = config.get<string>('database.uri');

const db = new Pool({
    connectionString
})

export default db;