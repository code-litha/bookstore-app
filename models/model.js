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
}

module.exports = Model