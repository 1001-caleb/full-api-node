const { Router } = require('express');
const users = require('../data/user');
const userRouter = Router();
const {nanoid} = require('nanoid');

userRouter.route('/user')
    .get((req, res, next) => {
        res.send({
            message: users,
            error: false
        })
    })
    .post((req, res) => {
        console.log('req.body', req.body);
        const {body:{name, email, id}} = req;
        users.push({
            id : nanoid(),
            name, 
            email
        })
        res.statusCode({
            message: 'User created',
            error: false
        })
    })

module.exports = userRouter;
