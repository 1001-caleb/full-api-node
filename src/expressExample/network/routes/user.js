const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { isAuthenticated, isAdmin } = require('../../middlewares')

const {
  user: { StoreuserSchema, userIdSchema, UpdateUserSchema, userLoginSchema }
} = require('../../schemas')
const { validatorCompiler, auth } = require('./utils')
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
  auth.generateToken(),
  async (req, res, next) => {
    try {
      const {
        accesToken,
        refreshToken,
        body: { email, password }
      } = req

      const isLoginCorrect = await new UserService({ email, password }).loginUser()

      if (isLoginCorrect) {
        response({
          error: false,
          message: {
            accesToken,
            refreshToken
          },
          res,
          status: 200
        })
      }
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
    isAdmin,
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
