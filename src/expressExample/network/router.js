const httperrors = require('http-errors')

const { homeRouter, userRouter, urlRouter, articleRouter, roleRouter, response } = require('./routes')
const routers = [ userRouter, urlRouter, roleRouter, articleRouter]

/**
 * @param {import('express').Express} app
 *
*/
const applyRoutes = (app) => {
  app.use('/', homeRouter)
  routers.forEach(router => app.use('/api', router))

  app.use((req, res, next) => {
    next(new httperrors.NotFound('this route does not found'))
  })

  app.use((error, req, res, next) => {
    console.error('error', error)
    response({
      message: error.message || 'Internal server error',
      res,
      status: error.status || 500
    })
  })
}

module.exports = applyRoutes
