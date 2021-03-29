import { Router } from 'express';
import db from '../../db';

const router = Router();

router.delete('/:userid', async (req, res) => {

    const userid = Number(req.params.userid);
    console.log(userid);

    try {
        const result = await db.accesstokens.removeTokensByUserid(userid);
        res.json({ msg: `You got rid of the token(s)` });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;