const { nanoid } = require('nanoid')

const UserService = require('./user')
const { mongo: { queries } } = require('../database')
const { url: { saveUrl, getOneUrl } } = queries

class UrlService {
    #link
    #userId

    /**
     * @param {string} link
     * @param {string|undefined} userId
    **/
    constructor(link, userId = '') {
        this.#link = link
        this.#userId = userId
    }

    async saveUrl() {
        if (!this.#userId)
            throw new Error('Missing required field: userId')

        const userService = new UserService(this.#userId)
        const foundUser = await userService.verifyUserExists()

        const newUrl = await saveUrl({
            id: nanoid(6),
            link: this.#link,
            userId: foundUser._id // mongo user id
        })

        return newUrl.toObject()
    }
}

module.exports = UrlService;