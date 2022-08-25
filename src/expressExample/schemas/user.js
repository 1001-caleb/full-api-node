const { Type } = require('@sinclair/typebox');

const StoreuserSchema = Type.Object({
    name: Type.String({ minLength: 2 }),
    lastname: Type.String({ minLength: 2 }),
    email: Type.String({
       format: 'email',
    })
})

const UpdateUserSchema = Type.OptionalType.Object({
    name: Type.Optional(Type.String({ minLength: 2 })),
    lastname: Type.Optional(Type.String({ minLength: 2 })),
    email: Type.Optional(Type.String({
       format: 'email',
    }))
})

const userIdSchema = Type.Object({
    id: Type.String({ minLength: 6, maxLength: 6 })
})

module.exports = {
    userIdSchema,
    StoreuserSchema,
    UpdateUserSchema
};