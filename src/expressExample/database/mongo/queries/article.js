const { ArticleModel } = require('../models')

/**
 * @param {Object} article
 * @param {String} article.id
 * @param {String} article.name
 * @param {String} article.price
 * @param {String} article.description
 * @param {String} article.image
 * @returns save a article
 */
const saveArticle = async article => {
    const savedArticle = new ArticleModel(article)

    await savedArticle.save()

    return savedArticle
}

/**
 * 
 * 
 * @returns found all articles
 */
const getAllArticles = async () => {
    const articles = ArticleModel.find()

    return articles
}

/**
 * 
 * @param {String} id 
 * @returns found user
 */
const getOneArticle = async (id) => {
    const articles = await ArticleModel.find({ id })

    return articles[0]
}

/**
 * 
 * @param {String} id 
 * @returns delete user
 */
const removeOneArticle = async (id) => {
    const article = await ArticleModel.findOneAndRemove({ id })

    return article
}


/**
 * 
 * @param {Object} article
 * @param {String} article.id
 * @param {String} article.name
 * @param {String} article.price
 * @param {String} article.description
 * @param {String} article.image
 * @returns updated article
 */
const updateOneArticle = async article => {
    const {id, name, price, description, image} = article

    const articleUpdated = await ArticleModel.findOneAndUpdate(
        {id},
        {name, price, description, image },
        {new: true}
    )

    return articleUpdated
}

module.exports = {
    saveArticle,
    getAllArticles,
    getOneArticle,
    removeOneArticle,
    updateOneArticle
}