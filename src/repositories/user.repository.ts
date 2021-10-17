import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import UserModel from "../models/user.models";

class UserRepository { 


    async findAllUsers(): Promise<UserModel[]>{
        // STRING DO COMANDO SQL
        const query = `
            SELECT uuid, username
            FROM application_user
        `

        // Aguarda a resposta da query e atribui a uma variavel
        const { rows } = await db.query<UserModel>(query);

        // RETORNA SOMENTE AS LINHAS DA TABELA
        return rows || [];
    }


    async findById(uuid: string): Promise<UserModel> { 

        try {
             // STRING DO COMANDO SQL
        const query = `
        SELECT uuid, username
        FROM application_user
        WHERE uuid = $1
        `

        // VALORES UTILIZADOS NA QUERY SQL
        const values = [uuid];


        // Aguarda a resposta da query, captura somente as linhas  e atribui a uma variavel
        const { rows } = await db.query<UserModel>(query, values);

        // DESTRUCT DE ARRAY / pega a primeira posição do array
        const [ user ] = rows;

        return user;

        } catch (error) {
            throw new DatabaseError("Usuário não encontrado ou inexistente");

        }
       
    }



    async createUser(user: UserModel): Promise<string> {

        const query = `
            INSERT INTO application_user (
                username, password
            )
            VALUES ($1, crypt($2, 'off-salt'))
            RETURNING uuid
            `
        ;

        const values = [user.username, user.password] 

        const { rows } = await db.query<{ uuid: string}>(query, values);

        const  [ newUser ] = rows;

        return newUser.uuid;

    }

    async updateUser(user: UserModel): Promise<void> {

        const query = `
            UPDATE  application_user SET
                username = $1, 
                password = crypt($2, 'off-salt')
            WHERE uuid = $3
            `;

        const values = [user.username, user.password, user.uuid]; 

        await db.query(query, values);

    }


    async removeUser (uuid: string ): Promise<void>{

        const query = `
            DELETE FROM application_user 
            WHERE uuid = $1
        `;


        const values = [uuid];

        await db.query(query, values);

    }


    async findByIdUsernameandPassword(username: string, password: string): Promise<UserModel | null>{

        try {
            const query = `
            SELECT uuid, username
            FROM application_user
            WHERE username = $1
            AND password = crypt($2, 'off-salt')
            `;

            const values = [username, password];

            const { rows } = await db.query<UserModel>(query, values);

            const [ user ] = rows;

            return user || null;

        } catch (error) {
            throw new DatabaseError("Erro na Consulta de Usuário");
        }


    }


    
} 

export default new UserRepository();