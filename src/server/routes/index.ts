import { Router } from 'express';
import blogsRouter from './blogs';
import blogtagsRouter from './blogtags';
import tagsRouter from './tags'

const router = Router();
// blogs route established
router.use('/blogs', blogsRouter);
// blogtags route established
router.use('/blogtags', blogtagsRouter);
// tags route established
router.use('/tags', tagsRouter);

export default router;