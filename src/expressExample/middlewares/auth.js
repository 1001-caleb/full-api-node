const jwt = require('jsonwebtoken')
const { models: { UserModel, RoleModel } } = require('../database/mongo')

function isAuthenticated (req, res, next) {
  const accesToken = req.headers.access.token

  const user = verifyToken(accesToken)
  if (!accesToken) { return res.status(401).send({ error: true, message: 'No token provided' }) }

  req.user = user
  next()
}

function verifyToken (token) {
  let user = null

  try {
    user = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return false
  }
  return user
}

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId)
    const roles = await RoleModel.find({ _id: { $in: user.role } })

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next()
        return
      }
    }
    return res.status(403).json({ message: 'Require Admin Role!' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
}

module.exports = {
  isAuthenticated,
  isAdmin
}
