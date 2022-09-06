const httpErrors = require('http-errors')
const jwt = require('jsonwebtoken')

const generateToken = () => {
  return (req, res, next) => {
    const {
      body: { email, password }
    } = req

    const payload = { email, password }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '10min'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    req.accessToken = accessToken
    req.refreshToken = refreshToken
  }
}

const verifyUser = () => {

}

module.exports = {
  generateToken,
  verifyUser
}
