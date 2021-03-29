import { Query } from '../index';
// query to locate a specific author/user by email
const findOneByEmail = async (email: string) => Query(`SELECT * FROM authors WHERE email = ? LIMIT 1`, [email]);
// query to find a specific author/user by id
const findOneById = async (id: number) => Query(`SELECT * FROM authors WHERE id = ? LIMIT 1`, [id]);
// query to add a new author/user to the db
const addUser = async ( user: { name: string, email: string, password: string }) => Query('INSERT INTO AUTHORS SET ?', user);
// all queries exported for future use
export default {
    findOneByEmail,
    findOneById,
    addUser 
}