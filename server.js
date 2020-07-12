require('dotenv').config()
const path = require('path')
const express = require('express')

const port = process.env.PORT || 3000
const app = express()




app
    .use(express.static(path.resolve(__dirname, 'dist')))
    .set('view engine', 'ejs')
    .set('views', path.resolve(__dirname, 'src/client/views'))
    .get('/', (req, res) => res.render('index'))
    .listen(port, () => console.log(`visit app on http://localhost:${port}`))