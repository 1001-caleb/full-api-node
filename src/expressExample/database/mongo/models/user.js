const { model, Schema } = require('mongoose')

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
    lastName: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    salt: {
      required: true,
      type: String
    },
    hash: {
      required: true,
      type: String
    },
    role: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'roles'
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        delete ret._id
      }
    },
    virtuals: {
      fullname: {
        get: function () {
          return `${this.name} + ${this.lastname}`
        }

      }
    }
  }
)

const UserModel = model('users', UserSchema)
module.exports = UserModel
