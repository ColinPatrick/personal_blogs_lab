import * as express from 'express';
import * as  passport from 'passport';

import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();
// post request for the /auth/login route
// utilizes the local strategy
// allows a user to log in and calls CreateToken to generate a new token
router.post('/', passport.authenticate('local'), async (req: any, res, next) => {
    try {
        let token = await CreateToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;