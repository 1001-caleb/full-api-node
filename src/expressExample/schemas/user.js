const { Type } = require('@sinclair/typebox')

const StoreuserSchema = Type.Object({
  name: Type.String({ minLength: 2 }),
  lastname: Type.String({ minLength: 2 }),
  email: Type.String({
    format: 'email'
  }),
  password: Type.String({ minLength: 8 })
})

const UpdateUserSchema = Type.Partial(StoreuserSchema)

const userIdSchema = Type.Object({
  id: Type.String({ minLength: 6, maxLength: 6 })
})

module.exports = {
  userIdSchema,
  StoreuserSchema,
  UpdateUserSchema
}
