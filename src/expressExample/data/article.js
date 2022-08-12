const {nanoid} = require('nanoid');

const articles = [
    {
        id: nanoid(),
        name: 'ASUS nitro 5',
        price: '$100',
        description: 'laptop gamer asus',
        image: 'https://static.acer.com/up/Resource/Acer/Laptops/Nitro_5/rev-jan-2022-intel/20211216/Nitro_5_AGW_KSP07_640.jpg'
    },
]

module.exports = articles;