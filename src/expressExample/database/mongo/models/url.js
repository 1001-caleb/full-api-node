const {model, Schema} = require('mongoose');

const urlSchema = new Schema(
    {
        id: {
            required: true,
            type: String,
            unique: true
        },
        link: {
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
        }
    }
)

const urlModel = model('urls', urlSchema)
module.exports = urlModel;