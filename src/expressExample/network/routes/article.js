const { Router } = require('express');
const {nanoid} = require('nanoid');

const response = require('./response');
const articles = require('../../data/article');

const articleRouter = Router();

articleRouter.route('/article')
    .get((req, res, next) => {
        response({error: false, message: articles, res, status: 200})
    })

    .post((req, res) => {
        const {body: {name, price, description, image, id}} = req;

        articles.push({
            id: nanoid(),
            name,
            price,
            description,
            image
        })

        response({error: false, message: articles, res, status: 201})
    })

module.exports = articleRouter;    