import { Router } from 'express';
import db from '../db';

const router = Router();
//get request that calls all the blogtags, which connect the blogs and their respective tags within the database from the blogtags table
// utilizes the 'getTags' query imported from the db file
router.get('/:blogid', async (req, res) => {

    const blogid = Number(req.params.blogid);

    try {
        const [blogtags] = await db.blogtags.getTags(blogid);
        res.json(blogtags);      
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// post request that dictates how new data is added to the blogtags table - this is what associates a tag with a blog
// utilizes the 'insert' query imported from the db file
router.post('/', async (req, res) => {
    const newBlogtag = req.body;
    try {
        const result = await db.blogtags.insert(newBlogtag.blogid, newBlogtag.tagid);
        res.json({ msg: 'blogtatg inserted', affectedRows: result.affectedRows });            
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// delete request that removes a row of data from the blogtags table - this is required before a blog itself can be deleted
// utilizes the 'remove' query imported from the db file
router.delete('/:blogid', async (req, res) => {
    
    const blogid = Number(req.params.blogid);

    try {
        const result = await db.blogtags.remove(blogid);
        res.json({ msg: 'You got rid of the blogtags!', affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
})


export default router;