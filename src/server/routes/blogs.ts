import { Router } from 'express';
import db from '../db';

const router = Router();
// get request for either all blogs or single blog
// utilizes the queries 'one' and 'all' imported from the db file
router.get('/:blogid?', async (req, res) => {

    const blogid = Number(req.params.blogid);

    try {
        if (blogid) {
            const [blog] = await db.blogs.one(blogid);
            res.json(blog);
        } else {
            const blogs = await db.blogs.all();
            res.json(blogs);
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// post request that dictates how to post a new blog to the db
// utilizes the 'insert' query imported from the db file
router.post('/', async (req, res) => {

    const blogDTO = req.body;
    blogDTO.authorid = 1;

    try {
        const result = await db.blogs.insert(blogDTO);
        res.json({ msg: 'You made a blog!', id: result.insertId });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// put request that dictates how a blog will be updated within the db
// utilizes the 'update' query imported from the db file
router.put('/:blogid', async (req, res) => {

    const blogid = Number(req.params.blogid);
    const editBlogDTO = req.body;

    try {
        const result = await db.blogs.update(editBlogDTO, blogid);
        res.json({ msg: `You edited blog${blogid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});
// delete request that dictates how a blog will be deleted from the db
// utilizes the 'remove' query imported from the db file
router.delete('/:blogid', async (req, res) => {

    const blogid = Number(req.params.blogid);

    try {
        const result = await db.blogs.remove(blogid);
        res.json({ msg: `You destroyed blog${blogid}!`, affectedRows: result.affectedRows });
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: 'Something is wrong!', e });
    }
});


export default router;