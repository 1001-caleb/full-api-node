/**
 * @param {Object} args
 * @param {Bollean} args.error
 * @param {Object} args.message
 * @param {Number} args.statusCode
 * @param {import('express').Response} args.res
 */

const response = ({ error = true, message, status = 500, res }) => {
  res.status(status).send({ error, message })
}

module.exports = response
