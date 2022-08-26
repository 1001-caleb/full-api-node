const { Router } = require('express')

const {
  user: {
    StoreuserSchema,
    userIdSchema,
    UpdateUserSchema
  }
} = require('../../schemas')
const { validatorCompiler } = require('./utils')
const { UserService } = require('../../services')
const response = require('./response')

const userRouter = Router()

userRouter.route('/user')
  .get(async (req, res, next) => {
    try {
      const userService = new UserService()
      response({ error: false, message: await userService.getAllUsers(), res, status: 200 })
    } catch (error) {
      next(error)
    }
  })

  .post(
    validatorCompiler(StoreuserSchema, 'body'),
    async (req, res, next) => {
      try {
        const { body: { name, lastname, email } } = req

        response({ error: false, message: await new UserService({ name, lastname, email }), res, status: 201 })
      } catch (error) {
        next(error)
      }
    })

userRouter.route('/user/:id')
  .get(
    validatorCompiler(userIdSchema, 'params'),
    async (req, res, next) => {
      try {
        const { params: { id: userId } } = req
        const userService = new UserService({ userId })

        response({ error: false, message: await userService.getUserById(), res, status: 200 })
      } catch (error) {
        next(error)
      }
    })

  .delete(
    validatorCompiler(userIdSchema, 'params'),
    async (req, res, next) => {
      try {
        const { params: { id } } = req
        const userService = new UserService({ userId: id })

        response({ error: false, message: await userService.removeUserById(), res, status: 200 })
      } catch (error) {
        next(error)
      }
    })

  .patch(
    validatorCompiler(userIdSchema, 'params'),
    validatorCompiler(UpdateUserSchema, 'body'),
    async (req, res, next) => {
      const { body: { name, lastname, email }, params: { id: userId } } = req

      try {
        response({ error: false, message: await new UserService({ userId, name, lastname, email }).updateOneUser(), res, status: 200 })
      } catch (error) {
        next(error)
      }
    })
module.exports = userRouter
