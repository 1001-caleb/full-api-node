const { Router } = require('express');
const { nanoid } = require('nanoid');

const response = require('./response');
const { mongo: { queries } } = require('../../database');

const articleRouter = Router();
const {
    article: {
        saveArticle,
        getAllArticles,
        getOneArticle,
        removeOneArticle,
        updateOneArticle
    }
} = queries;

articleRouter.route('/article')
    .get(async (req, res, next) => {
        try {
            const articles = await getAllArticles();
            response({ error: false, message: articles, res, status: 200 });
        } catch (error) {
            next(error)
        }
    })

    .post(async (req, res, next) => {
        try {
            const { body: { name, price, description, image } } = req;

            await saveArticle({ id: nanoid(6), name, price, description, image });
            response({ error: false, message: getAllArticles(), res, status: 200 });
        } catch (error) {
            next(error)
        }
    })

articleRouter.route('/article/:id')
    .get(async (req, res, next) => {
        try {
            const { params: { id } } = req
            const article = await getOneArticle(id)

            response({ error: false, message: article, res, status: 200 });
        } catch (error) {
            next(error)
        }
    })

    .delete(async (req, res, next) => {
        try {
            const { params: { id } } = req

            await removeOneArticle(id)

            response({ error: false, message: getAllArticles(), res, status: 200 });
        } catch (error) {
            next(error)
        }
    })

    .patch(async (req, res, next) => {
        const { body: { name, price, description, image }, params: { id } } = req
        try {
            await updateOneArticle(id, { name, price, description, image })

            response({ error: false, message: getAllArticles(), res, status: 200 })
        } catch (error) {
            next(error)
        }
    })

module.exports = articleRouter;    