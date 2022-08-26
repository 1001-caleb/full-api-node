const httperrors = require('http-errors')
const { mongo: { queries } } = require('../database')
const { user: { getOneUser, saveUser, getAllUsers, removeOneUser, updateOneUser } } = queries
const { nanoid } = require('nanoid')
class UserService {
  #userId
  #name
  #lastname
  #email

  /**
     * @param {Object} args
     * @param {string} args.userId
     * @param {string} args.name
     * @param {string} args.lastname
     * @param {string} args.email
    **/
  constructor (args) {
    const { userId = '', name = '', lastname = '', email = '' } = args

    this.#userId = userId
    this.#name = name
    this.#lastname = lastname
    this.#email = email
  }

  async verifyUserExists () {
    if (!this.#userId) { throw new httperrors.BadRequest('Missing userId') }

    const user = await getOneUser(this.#userId)

    if (!user) throw new httperrors.NotFound('User not found')

    return user
  }

  async saveUser () {
    if (this.#name) { throw new httperrors.BadRequest('Missing name') }

    if (this.#lastname) { throw new httperrors.BadRequest('Missing lastname') }

    if (this.#email) { throw new httperrors.BadRequest('Missing email') }

    await saveUser({
      id: nanoid(6),
      name: this.#name,
      lastname: this.#lastname,
      email: this.#email
    })

    return await getAllUsers()
  }

  async getUserById () {
    if (!this.#userId) { throw new httperrors.BadRequest('Missing userId') }

    const user = await getOneUser(this.#userId)

    if (!user) throw new httperrors.NotFound('User not found')

    return user
  }

  async getAllUsers () {
    return await getAllUsers()
  }

  async removeUserById () {
    if (!this.#userId) { throw new httperrors.BadRequest('Missing userId') }

    const user = await removeOneUser(this.#userId)
    if (!user) throw new httperrors.NotFound('User not found')

    return user
  }

  async updateOneUser () {
    if (!this.#userId) { throw new httperrors.BadRequest('Missing userId') }

    return await updateOneUser({
      id: this.#userId,
      name: this.#name,
      lastname: this.#lastname,
      email: this.#email
    })
  }
}

module.exports = UserService
