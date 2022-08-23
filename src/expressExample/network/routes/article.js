const { Router } = require('express');
const { nanoid } = require('nanoid');

const response = require('./response');
const { userRouter } = require('.');

const articleRouter = Router();

articleRouter.route('/article')
    .get((req, res, next) => {
        response({ error: false, message: articles, res, status: 200 })
    })

    .post((req, res) => {
        const { body: { name, price, description, image, id } } = req;

        articles.push({
            id: nanoid(),
            name,
            price,
            description,
            image
        })

        response({ error: false, message: articles, res, status: 201 })
    })


articleRouter.route('/article/:id')
    .delete((req, res) => {
        const { params: { id } } = req;

        const articleIndex = articles.findIndex(article => article.id === id);

        if (articleIndex === -1)
            return response({
                message: 'Article not found',
                res,
                status: 404
            })
        user.splice(articleIndex, 1)
        response({ error: false, message: articles, res, status: 200 })
    })

    .patch((req, res) => {
        const {
            body: {name, price, description, image},
            params: {id}
        } = req;

        const articleIndex = articles.findIndex(article => article.id === id);

        if(articleIndex === -1)
            return response({
                message: 'Article not found',
                res,
                status: 404
            })
        articles.splice(articleIndex, 1, {
            ...articles[articleIndex],
            ...(name && {name}),
            ...(price && {price}),
            ...(description && {description}),
            ...(image && {image})
        })
        response({ error: false, message: articles, res, status: 200 })
    })
module.exports = articleRouter;    