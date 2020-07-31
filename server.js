require('dotenv').config()
const port = process.env.PORT || 3000
const express = require('express')
const app = express()




app
    .use(express.static('public'))
    .set('view engine', 'ejs')
    .set('views', 'views/templates')
    .get('/', (req, res) => res.render('index'))
    .listen(port, () => console.log(`visit app on http://localhost:${port}`))