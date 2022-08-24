const httperrors = require('http-errors');
const { mongo: { queries } } = require('../database')
const { user: { getOneUser } } = queries

class UserService {
    #userId

    /**
     * @param {string|undefined} userId
    **/
    constructor(userId = '') {
        this.#userId = userId
    }

    async verifyUserExists() {
        if (!this.#userId)
            throw new Error(`Missing userId`)

        const user = await getOneUser(this.#userId)

        if (!user) throw new httperrors.NotFound(`User not found`)

        return user
    }

}

module.exports = UserService;