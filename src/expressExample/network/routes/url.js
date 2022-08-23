const { Router } = require('express')
const { UrlService } = require('../../services')

const response = require('./response')
const urlRouter = Router()

urlRouter.route('/url/:userId')
    .post(async (req, res) => {
        const {
            body: { link },
            params: { userId }
        } = req
        const urlService = new UrlService({ link, userId })

        try {
            const result = await urlService.saveUrl()

            response({
                error: false,
                message: result,
                res,
                status: 201
            })
        } catch (error) {
            console.error(error)
            response({ message: 'Internal server error', res })
        }
    })

// urlRouter.route('/url/:id')
//     .get(async (req, res) => {
//         const { params: { id } } = req

//         try {
//             const url = await getOneUrl(id)

//             res.redirect(url.link)
//         } catch (error) {
//             console.error(error)
//             response({ message: 'Internal server error', res })
//         }
//     })

module.exports = urlRouter  