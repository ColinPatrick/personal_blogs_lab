import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as path from 'path';
import './middleware/localstrategy';
import './middleware/bearerstrategy';
import routes from './routes';

// initial server set up
const app = express();
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
// routes set up
app.use(routes);
// other routes from the front end set up
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
// server set to run on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
