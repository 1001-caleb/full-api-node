const { UserModel } = require('../models')

/**
 * 
 * @param {Object} user
 * @param {String} user.id
 * @param {String} user.name
 * @param {String} user.lastname
 * @param {String} user.email
 * @returns edit a user
 */

const saveUser = async (id, link) => {
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
    const users = UserModel.find({ id })
    return users[0]
}

/**
 * 
 * 
 * @returns found all users
 */

const getAllUsers = async (id) => {
    const users = UserModel.find({ id })
    return users
}


/**
 * 
 * @param {String} id 
 * @returns delete a user
 */

const removeOneUser = async (id) => {
    const user = await UserModel.findOneAndRemove({ id })

}

/**
 * 
 * @param {Object} user
 * @param {String} user.id
 * @param {String|undefined} user.name
 * @param {String|undefined} user.lastname
 * @param {String|undefined} user.email
 * @returns update a user
 */

const updateOneUser = async (id) => {
    const {  name, lastname, email } = user
    const userUpdated = await UserModel.findOneAndUpdate(
        { id },
        { name, lastname, email },
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