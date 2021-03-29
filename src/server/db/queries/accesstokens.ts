import { Query } from '../index';
// query to find a specific token
const findOne = async (id: number, token: string) => Query(`SELECT * FROM accesstokens WHERE id = ? AND token = ?`, [id, token]);
// query to add new data to the accesstokens table
const insert = async (userid: number) => Query(`INSERT INTO accesstokens (userid) VALUES (?)`, [userid]);
// query to update a token within the accesstokens db
const update = async (id: number, token: string) => Query(`UPDATE accesstokens SET token = ? WHERE id = ?`, [token, id]);
// query to remove a token based on its userid
const removeTokensByUserid = async (userid: number) => Query('DELETE FROM accesstokens WHERE userid = ?', [userid]);
// all queries exported for future use
export default {
    findOne,
    insert,
    update,
    removeTokensByUserid 
}