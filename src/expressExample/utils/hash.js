const { createHash } = require('node:crypto')
const { nanoid } = require('nanoid')

const hashString = (string) => {
  const salt = nanoid()
  const hash = createHash('sha256')

  hash.update(`${string}${salt}`)

  console.log(hash.digest('hex'))

  const result = hash.digest('hex')

  return { salt, result }
}

module.exports = { hashString }
