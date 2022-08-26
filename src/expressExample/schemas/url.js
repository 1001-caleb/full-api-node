const { Type } = require('@sinclair/typebox')

const urlID = Type.String({ minLength: 6 })

module.exports = {
  urlID
}
