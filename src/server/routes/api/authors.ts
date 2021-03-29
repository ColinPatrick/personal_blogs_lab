import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/:authorid', async (req, res) => {

    const authorid = Number(req.params.authorid);

    try {
        const [author] = await db.authors.findOneById(authorid);
        res.json(author);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
})

export default router;