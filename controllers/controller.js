const Model = require('../models/model')

class Controller {

  static async listCategories(request, response) {
    try {
      const categories = await Model.readCategories()
      // response.send(categories)
      response.render('categories', { categories })  
    } catch (error) {
      console.log(error);
      response.send(error)
    }
  }

  static async listBooks (request, response) {
    try {
      const books = await Model.readBooks()
      response.render('books', { books })
    } catch (error) {
      console.log(error);
      response.send(error)
    }
  }

  static async findBookById(request, response){
    try {
      /*
      body => menerima data yang diinput lewat form di html // POST
      params => menerima data yang diinput lewat dynamic params 
      query => menerima data yang diinput lewat query di url
      */
      let { id } = request.params
      let book = await Model.findBookById(id)
      response.send(book)
    } catch (error) {
      console.log(error);
      response.send(error.message)
    }
  }

  static async deleteBook(request, response){
    try {
      const { id } = request.params
      await Model.deleteBook(id)

      response.redirect('/books')
    } catch (error) {
      console.log(error);
      response.send(error)
    }
  }

  static async renderAdd(req, res){
    try {
      let categories = await Model.readCategories()
      res.render('add', { categories })
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async handleAdd(req, res){
    try {
      const {name, price, imgUrl, isDiscount, publisher, author, synopsis, CategoryId} = req.body
      await Model.addBook(name, price, imgUrl, isDiscount, publisher, author, synopsis, CategoryId)
      res.redirect('/books')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }


}

module.exports = Controller