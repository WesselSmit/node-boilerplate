require('dotenv').config()
const express = require('express')

const port = process.env.PORT || 3000
const app = express()




app
    .use(express.static('dist'))
    .set('view engine', 'ejs')
    .set('views', 'src/client/views')
    .get('/', (req, res) => res.render('index'))
    .listen(port, () => console.log(`visit app on http://localhost:${port}`))