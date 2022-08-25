const httperrors = require('http-errors');

const { userRouter, urlRouter, articleRouter, response } = require('./routes');
const routers = [ userRouter, urlRouter, articleRouter ];

/** 
 * @param {import('express').Express} app
 *  
*/
const applyRoutes = (app) => {
    routers.forEach(router => app.use('/api', router));


    app.use((req, res, next) => {
        next(new httperrors.NotFound(`this route does not found`))
    })

    app.use((error, req, res, next) => {
        console.error('error', error)
        response({
            message: error.message || 'Internal server error',
            res,
            status: error.status || 500
        })
    })
}

module.exports = applyRoutes;