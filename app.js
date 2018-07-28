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

let detailsRoute = function(req, res, next) {
    console.log(req.method + " " + req.url);
    
    if (req.headers && req.headers.authorization) {
        console.log("Token: " + req.headers.authorization.substring(4, req.headers.authorization.lenght));
    }

    let token = req.headers.authorization ? req.headers.authorization.substring(4, req.headers.authorization.lenght).trim() : undefined;

    if (token) {
        let tokenDecode = jwt.decode(token, config.jwtSecret);
        let Users = app.datasource.models.Users;
        
        Users.findOne({ where: { id: tokenDecode.id } }).then((user) => {
            if (user) {
                res.setHeader('userId', user.id);
                res.setHeader('userEmail', user.email);
                res.setHeader('userName', user.name);    

                next();
            } else {
                error("Token invalid or user not found.");
            }
        })
        .catch(() => {
            error("Error when was trying load the user.");
        })    
    } else {
        error("Token not found.");
    }  
    
    function error(message) {
        res.status(500);
        res.json({ error: message });
    }
};

let cors = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    next();
}

app.use('/', detailsRoute, cors);

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
