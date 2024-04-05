const Model = require('../models/model')
const View = require('../views/view')

class Controller {
  static async listCategories() {
    try {
      const categories = await Model.readCategories()      
      View.showTable(categories)
    } catch (error) {
      View.showError(error)
    }
  }

  static async listBooks () {
    try {
      const books = await Model.readBooks()
      View.showTable(books)
    } catch (error) {
      View.showError(error)
    }
  }
}

module.exports = Controller