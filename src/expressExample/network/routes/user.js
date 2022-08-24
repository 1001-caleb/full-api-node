const { Router } = require('express');
const { nanoid } = require('nanoid');

const { mongo: { queries } } = require('../../database')
const response = require('./response');

const userRouter = Router();
const {
    user: {
        getAllUsers,
        saveUser,
        removeOneUser,
        updateOneUser,
        getOneUser
    }
} = queries;


userRouter.route('/user')
    .get(async (req, res, next) => {
        try {
            const users = await getAllUsers();
            response({ error: false, message: users, res, status: 200 })
        } catch (error) {
            next(error)
        }

    })

    .post(async (req, res, next) => {
        try {
            const { body: { name, lastname, email } } = req;
            await saveUser({id: nanoid(6), name, lastname, email});

            response({ error: false, message: await getAllUsers(), res, status: 201 })
        } catch (error) {
            next(error)
        }

    })

userRouter.route('/user/:id')
    .get(async(req, res, next) => {
        try {
            const { params: { id } } = req
            const user =  await getOneUser(id)

            response({ error: false, message: user, res, status: 200 })
        } catch (error) {
            next(error)
        }
    })

    .delete(async (req, res, next) => {
        try {
            const { params: { id } } = req
            await removeOneUser(id)

            response({ error: false, message: getAllUsers(), res, status: 200 })
        } catch (error) {
            next(error)
        }

    })

    .patch(async (req, res, next) => {
        const { body: { name, lastname, email }, params: { id } } = req;

        try {
            await updateOneUser({ id, name, lastname, email });
            response({ error: false, message: await getAllUsers(), res, status: 200 })
        } catch (error) {
            next(error)
        }

    })
module.exports = userRouter;
