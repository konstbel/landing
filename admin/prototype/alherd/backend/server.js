const jsonServer  = require('json-server');
const server      = jsonServer.create();
const router      = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const fs          = require('fs');
const argon2      = require('argon2');
const jwt         = require('jsonwebtoken');
const secret      = fs.readFileSync('secret');


const isAuthorized = (req) => {
    if (!req.headers.authorization) {
        return false
    }
    try {
        let [type, token] = req.headers.authorization.split(' ');
        jwt.verify(token, secret);
        return true;
    } catch (e) {
        return false
    }
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if(req.url === '/login'){
        next();
        return;
    }
    if (!isAuthorized(req) ) {
        res.sendStatus(401);
        return;
    }
    next()
});
server.post(
    '/login',
    async (req, res) => {
        let users = [];
        res.set('Access-Control-Allow-Origin', '*');
        try {
            users = JSON.parse(fs.readFileSync('users.json'));
        } catch (e) {
            res.json({'error': 'not_found_user'});
            return
        }
        if (!req.body.username || !req.body.password) {
            res.json({'error': 'not_found_username_or_password'});
            return;
        }

        if (!req.body.username in users) {
            res.json({'error': 'not_found_user'});
            return
        }

        try {
            if (!await argon2.verify(users[req.body.username], req.body.password)) {
                res.json({'error': 'invalid_password'});
                return
            }
            res.json(
                {
                    token: jwt.sign(
                        {
                            exp : Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3),
                            data: {username: users[req.body.username]}
                        },
                        secret
                    )
                }
            );
        } catch (err) {
            res.json({'error': 'unknown'});
            throw err;
        }
    }
);

server.use(router);
server.listen(4000, () => {
    console.log('JSON Server is running')
});
