const { model, Schema } = require('mongoose');

const UserSchema = new Schema(
    {
        id: {
            required: true,
            type: String,
            unique: true
        },
        name: {
            required: true,
            type: String
        },
        lastname: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toObject: {
            transform: (_, ret) => {
                delete ret._id;
            }
        },
        virtuals: {
            fullname: {
                get: function () {
                    return `${this.name} + ${this.lastname}`;
                }

            }
        }
    }
)

const UserModel = model('users', UserSchema)
module.exports = UserModel;