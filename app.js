const Controller = require('./controllers/controller')
const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs') // konfigurasi ejs sebagai view engine di express
app.use( express.urlencoded({ extended : true }) )// body parser

// routing
// app.method('path', 'handler/callback')
/*
get - user minta ke server
post - user ngasih ke server
*/
/*
send => ngirim response dengan raw data
render => ngirim response dengan tampilan html
redirect => mengarahkan user ke routing yang sudah ada

Dynamic path
// /books/3
*/
app.get('/categories', Controller.listCategories)
app.get('/books', Controller.listBooks)
app.get('/books/delete/:id', Controller.deleteBook)
app.get('/books/add', Controller.renderAdd)
app.post('/books/add', Controller.handleAdd)
app.get('/books/:id', Controller.findBookById)
// app.get('/books/add')


app.listen(PORT, () => {
  console.log(`Surfing on PORT : ${PORT}`);
})

// EXPRESS JS
// APA ?
// KENAPA ?
// BAGAIMANA ?