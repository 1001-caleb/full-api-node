const { UrlModel } = require('../models')

/**
 *   @param {Object} url - id of the user
 *   @param {String} url.id - link to be saved
 *   @param {String} url.link
 *   @param {String} url.userId mongo user id
 *   @returns - the saved url
 */

const saveUrl = async url => {
  const savedUrl = new UrlModel(url)

  await savedUrl.save()
  
  return savedUrl
}

/**
 *
 * @param {String} id
 * @returns found url
 */

const getOneUrl = async (id) => {
  const urls = UrlModel.find({ id }).populate('userId')

  return urls[0]
}

module.exports = {
  saveUrl,
  getOneUrl
}
