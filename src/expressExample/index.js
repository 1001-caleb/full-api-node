const express = require('express')
const morgan = require('morgan')

const { routes: { userRouter } } = require('./network')
const { mongo: { dbConnection } } = require('./database')
const response = require('./network/routes/response')

const { connect } = dbConnection()
const app = express()
const PORT = process.env.PORT


const main = async () => {
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(userRouter)

  app.use((req, res) => {
    response({
      message: 'This route does not exists',
      res,
      status: 404
    })
  })

  await connect()

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
  })
}

main()