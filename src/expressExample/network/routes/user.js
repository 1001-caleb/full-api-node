const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../../middlewares')

const {
  user: { StoreuserSchema, userIdSchema, UpdateUserSchema, userLoginSchema }
} = require('../../schemas')
const { validatorCompiler } = require('./utils')
const { UserService } = require('../../services')
const response = require('./response')

const userRouter = Router()

userRouter.route('/user').get(
  async (req, res, next) => {
    try {
      const userService = new UserService()
      response({ error: false, message: await userService.getAllUsers(), res, status: 200 })
    } catch (error) {
      next(error)
    }
  }
)

userRouter.route('/user/signup').post(
  validatorCompiler(StoreuserSchema, 'body'),
  async (req, res, next) => {
    try {
      const {
        body: { name, lastname, email, password }
      } = req

      response({
        error: false,
        message: await new UserService({
          name,
          lastname,
          email,
          password
        }).saveUser(),
        res,
        status: 201
      })
    } catch (error) {
      next(error)
    }
  }
)

userRouter.route('/user/login').post(
  validatorCompiler(userLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      const {
        body: { email, password }
      } = req

      const payload = { email, password }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2min'
      })

      console.log('token', token)

      response({
        error: false,
        message: await new UserService({
          email,
          password
        }).login(),
        res,
        status: 200
      })
    } catch (error) {
      next(error)
    }
  }
)

userRouter.route('/user/:id')
  .get(
    isAuthenticated,
    validatorCompiler(userIdSchema, 'params'),
    async (req, res, next) => {
      try {
        const { params: { id: userId } } = req
        const userService = new UserService({ userId })

        response({ error: false, message: await userService.getUserById(), res, status: 200 })
      } catch (error) {
        next(error)
      }
    }
  )

  .delete(
    isAuthenticated,
    validatorCompiler(userIdSchema, 'params'),
    async (req, res, next) => {
      try {
        const { params: { id } } = req
        const userService = new UserService({ userId: id })

        response({ error: false, message: await userService.removeUserById(), res, status: 200 })
      } catch (error) {
        next(error)
      }
    }
  )

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
    }
  )
module.exports = userRouter
