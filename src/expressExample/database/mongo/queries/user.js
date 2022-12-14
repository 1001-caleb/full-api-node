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
 * @param {import('mongoose').Schema.Types.ObjectId} user.role
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

const getUserByID = async (id) => {
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

const removeUserByID = async (id) => {
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
      ...(salt &&
        hash && {
        salt,
        hash
      })
    },
    { new: true }
  )
  return userUpdated
}

/**
 * It returns the first user in the database that matches the query
 * @param {Object} query - The query object that will be used to find the user.
 * @returns The first user in the database
 */
const getOneUser = async (query = {}) => {
  const users = await UserModel.find(query)

  return users[0]
}

module.exports = {
  saveUser,
  getUserByID,
  removeUserByID,
  getAllUsers,
  updateOneUser,
  getOneUser
}
