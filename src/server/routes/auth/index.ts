import * as express from 'express';
import loginRouter from './login';
import registerRouter from './register';

const router = express.Router();
// routes for /auth/login and /auth/register initialized
router.use('/login', loginRouter);
router.use('/register', registerRouter); 

export default router;