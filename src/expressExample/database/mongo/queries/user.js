const { UserModel } = require('../models')

/**
 *
 * @param {Object} user
 * @param {String} user.id
 * @param {String} user.name
 * @param {String} user.lastname
 * @param {String} user.email
 * @param {String} user.salt
 * @param {String} user.hash
 * @returns save a user
 */

const saveUser = async user => {
  const savedUser = new UserModel(user)

  await savedUser.save()

  return savedUser
}

/**
 *
 * @param {String} id
 * @returns found user
 */

const getOneUser = async (id) => {
  const users = await UserModel.find({ id })
  return users[0]
}

/**
 *
 *
 * @returns found all users
 */

const getAllUsers = async => {
  const users = UserModel.find()
  return users
}

/**
 *
 * @param {String} id
 * @returns delete a user
 */

const removeOneUser = async (id) => {
  const user = await UserModel.findOneAndRemove({ id })

  return user
}

/**
 *
 * @param {Object} user
 * @param {String} user.id
 * @param {String|undefined} user.name
 * @param {String|undefined} user.lastname
 * @param {String|undefined} user.email
 * @param {String|undefined} user.salt
 * @param {String|undefined} user.hash
 * @returns update a user
 */

const updateOneUser = async user => {
  const { id, name, lastname, email, salt, hash } = user
  const userUpdated = await UserModel.findOneAndUpdate(
    { id },
    {
      ...(name && { name }),
      ...(lastname && { lastname }),
      ...(email && { email }),
      ...(salt && hash && { salt, hash })
    },
    { new: true }
  )
  return userUpdated
}

module.exports = {
  saveUser,
  getOneUser,
  removeOneUser,
  getAllUsers,
  updateOneUser
}
