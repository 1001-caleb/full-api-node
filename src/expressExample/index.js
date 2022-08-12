const express = require('express');
const morgan = require('morgan');

const {userRouter} = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.use(morgan('dev'));
app.use(userRouter);

const fooMiddleware = (req, res, next) => {
    console.log('fooMiddleware');
    next();
}


app.get('/', fooMiddleware, (req, res) => {
    res.send({
        message: `hola desde express`
    })
})

app.listen(PORT, () =>{
    console.log(`Server running at port: ${PORT}`)
})
