const httperrors = require('http-errors')
const { mongo: { queries } } = require('../database')
const { hash: { hashString } } = require('../utils')
const { user: { getOneUser, saveUser, getAllUsers, removeOneUser, updateOneUser } } = queries
const { nanoid } = require('nanoid')
const RoleService = require('./role')
class UserService {
  #userId
  #name
  #lastname
  #email
  #password
  #role

  /**
     * @param {Object} args
     * @param {string} args.userId
     * @param {string} args.name
     * @param {string} args.lastname
     * @param {string} args.email
     * @param {string} args.password
     * @param {String} args.role
    **/
  constructor (args = {}) {
    const { userId = '', name = '', lastname = '', email = '', password = '', role = '2' } = args

    this.#userId = userId
    this.#name = name
    this.#lastname = lastname
    this.#email = email
    this.#password = password
    this.#role = role
  }

  async verifyUserExists () {
    if (!this.#userId) throw new httperrors.BadRequest('Missing userId')

    const user = await getOneUser(this.#userId)

    if (!user) throw new httperrors.NotFound('User not found')

    return user
  }

  async saveUser () {
    if (!this.#name) { throw new httperrors.BadRequest('Missing name') }

    if (!this.#lastname) { throw new httperrors.BadRequest('Missing lastname') }

    if (!this.#email) { throw new httperrors.BadRequest('Missing email') }

    if (!this.#password) { throw new httperrors.BadRequest('Missing password') }

    if (!this.#role) { throw new httperrors.BadRequest('Missing required field: role') }

    const { salt, result: hash } = hashString(this.#password)
    const role = await new RoleService({ id: this.#role }).getRoleByID()

    await saveUser({
      id: nanoid(6),
      name: this.#name,
      lastname: this.#lastname,
      email: this.#email,
      salt,
      hash,
      role: role._id
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

    const updatePassword = !!this.#password
    const aux = {}

    if (updatePassword) {
      const { salt, result: hash } = hashString(this.#password)

      aux.salt = salt
      aux.hash = hash
    }

    return await updateOneUser({
      id: this.#userId,
      name: this.#name,
      lastname: this.#lastname,
      email: this.#email,
      ...aux
    })
  }

  async login () {
    if (!this.#email) { throw new httperrors.BadRequest('Missing required field: email') }

    if (!this.#password) { throw new httperrors.BadRequest('Missing required field: password') }

    const user = await getOneUser({ email: this.#email })

    if (!user) throw new httperrors.BadRequest('Bad credentials')

    const { salt, hash } = user
    const { result } = hashString(this.#password, salt)

    if (hash !== result) throw new httperrors.BadRequest('Bad credentials')

    return user
  }
}

module.exports = UserService
