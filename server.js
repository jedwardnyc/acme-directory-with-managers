const express = require('express');
const nunjucks = require('nunjucks');
// const path = require('path');
const app = express();
nunjucks.configure({ noCache:true })

app.use(require('body-parser').urlencoded())
app.use(require('method-override')('_method'))

app.set('view engine', 'html');
app.engine('html', nunjucks.render)

app.use('/', require("./routes"))
app.use('/vendor', express.static('node_modules'))

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`))


const conn = require('./db');

conn.sync()
  .then(()=> conn.seed())