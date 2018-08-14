import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authorization from './auth';
import jwt from 'jwt-simple';

const app = express();

const PORT = process.env.PORT || 7000

app.config = config;
app.datasource = datasource(app);
app.set('port', PORT);
app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

function error(message) {
    res.status(500);
    res.json({ error: message });
}

const middleware = (req, res, next) => { 
    console.log('this is the request', req.body);
    req.headers['new-header'] = 'hello';
    next();
 }

const cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    next();
}

app.use('/', middleware, cors);

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
