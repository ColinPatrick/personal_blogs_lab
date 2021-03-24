import { Router } from 'express';
import db from '../db';

const router = Router();
// get request that calls all of the tags from the db
// utilizes the 'all' query imported from the db file
router.get('/', async (req, res) => {
    try {
        const tags = await db.tags.all();
        res.json(tags);      
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});

export default router;