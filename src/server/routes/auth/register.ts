import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/passwords';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();
// post request for /auth/register route
// allows for the registration of a new user
// creates and hashes password and creates a new token
// utilizes 'addUser' query to add new author/user to authors table
router.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        user.password = HashPassword(req.body.password);
        let result: any = await DB.authors.addUser(user);
        let token = await CreateToken({ userid: result.insertId });
        res.json({
            token, 
            userid: result.insertId
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;