import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import apiRouter from './routes';

// initial server set up
const app = express();
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
// api route set up
app.use('/api', apiRouter);
// other routes from the front end set up
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
// server set to run on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
