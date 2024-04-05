const pool = require('../config/connection')
const Factory = require('./class')

class Model {
  static async readCategories () {
    try {
      const query = `SELECT * FROM "Categories";`
      const data = await pool.query(query)
      
      // console.log(data.rows)
      const categories = data.rows.map(row => {
        return Factory.createCategory(row.id, row.name)
      })

      // console.log(categories)
      return categories
    } catch (error) {
      throw error
    }
  }

  static async readBooks () {
    try {
      const query = `
        SELECT 
          b.*,
          c."id"  AS category_id,
          c."name" AS category_name
        FROM "Books" b 
        INNER JOIN "Categories" c ON c.id = b."CategoryId" ;
      `
      const data = await pool.query(query)
      const books = Factory.bulkCreateBooks(data.rows)
      return books
    } catch (error) {
      throw error
    }
  }

  static async findBookById(id){
    try {
      // untuk menhandle sql injection OR 1 = 1
      const paramId = Number(id)
      if (!paramId) {
        throw new Error(`Ciee mau ngehack yaaa`)
      }
      //
      const query = `
        SELECT 
          b.*,
          c."id"  AS category_id,
          c."name" AS category_name
        FROM "Books" b 
        INNER JOIN "Categories" c ON c.id = b."CategoryId"
        WHERE b."id" = ${id};
      `
      const data = await pool.query(query)
      const book = Factory.bulkCreateBooks(data.rows)[0]

      if(!book) throw new Error(`Book with ID : ${id} is not found`)

      return book
    } catch (error) {
      throw error
    }
  }

  static async deleteBook(id){
    try {
      const query = `DELETE FROM "Books" WHERE "id" = ${id}`
      await pool.query(query)

    } catch (error) {
      throw error
    }
  }

  static async addBook(name, price, imgUrl, isDiscount, publisher, author, synopsis, CategoryId){
    try {
      let query = `INSERT INTO "Books" (name, price, "imgUrl", "isDiscount", publisher, author, synopsis, "CategoryId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
      let discount = +isDiscount ? true : false
      let values = [name, price, imgUrl, discount, publisher, author, synopsis, CategoryId]

      await pool.query(query, values)
    } catch (error) {
      throw error
    }
  }
}

module.exports = Model