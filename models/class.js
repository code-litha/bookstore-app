class Category {
  constructor(id = 0, name = '') {
    this.id = id
    this.name = name
  }
}

class Book {
  #imgUrl
  constructor(id = 0, name = '', price = 0, imgUrl = '', category = {}) {
    this.id = id
    this.name = name
    this.price = price
    this.#imgUrl = imgUrl
    this.category = category
  }
}

class Factory {
  static createCategory (id, name) {
    return new Category(id, name)
  }

  static bulkCreateBooks (data) {
    const books = data.map(val => {
      const {id, name, price, imgUrl, category_id, category_name} = val
      const category = new Category(category_id, category_name)
      return new Book(id, name, price, imgUrl, category)
    })

    return books
  }
}

module.exports = Factory