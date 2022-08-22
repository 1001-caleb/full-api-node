const { UrlModel } = require('../models')

/**
 *   @param {String} id - id of the user
 *   @param {String} link - link to be saved
 *   @returns - the saved url
 */

const saveUrl = async (id, link) => {
    const url = new UrlModel({ id, link })
    await url.save()
    return url
}

/**
 * 
 * @param {String} id 
 * @returns found url
 */

const getOneUrl = async (id) => {
    const urls = UrlModel.find({ id })
    return urls[0]
}

module.exports = {
    saveUrl,
    getOneUrl
}