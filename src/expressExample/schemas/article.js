const {Type} = require('@sinclair/typebox');

const StoreArticleSchema = Type.Object({
    name: Type.String({ minLength: 2 }),
    description: Type.String({ minLength: 2 }),
    price: Type.String({ min: 3 }),
    image: Type.String({ minLength: 10 })
})

const UpdateArticlerSchema = Type.Object({
    name: Type.Optional(Type.String({ minLength: 2 })),
    description: Type.Optional(Type.String({ minLength: 2 })),
    price: Type.Optional(Type.String({ minLength: 3 })),
    image: Type.Optional(Type.String({ minLength: 10 })),
})

module.exports = {
    StoreArticleSchema,
    UpdateArticlerSchema
}
    