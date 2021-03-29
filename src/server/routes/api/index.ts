import { Router } from 'express';
import * as passport from 'passport';
import blogsRouter from './blogs';
import blogtagsRouter from './blogtags';
import tagsRouter from './tags'
import authorsRouter from './authors';
import tokensRouter from './tokens';

const router = Router();
// utilizes the bearer passport strategy for all api routes below
router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
})
// blogs route established
router.use('/blogs', blogsRouter);
// blogtags route established
router.use('/blogtags', blogtagsRouter);
// tags route established
router.use('/tags', tagsRouter);
// authors route established
router.use('/authors', authorsRouter);
// tokens route established
router.use('/tokens', tokensRouter);

export default router; 