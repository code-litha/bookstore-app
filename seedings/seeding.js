const pool = require('../config/connection')
const fs = require('fs').promises

async function createCategoryQuery () {
  try {
    const dataStr = await fs.readFile('./data/category.json', 'utf-8')
    const data = JSON.parse(dataStr)
    const values = data
      .map(val => {
        return `('${val.name}')`
      })
      .join(', \n')
    
    const query = `INSERT INTO "Categories" ("name") VALUES ${values};`

    return query
  } catch (error) {
    throw error
  }
}

async function createBookQuery () {
  try {
    const dataStr = await fs.readFile('./data/books.json', 'utf-8')
    const data = JSON.parse(dataStr)
    const values = data
      .map(val => {
        const { name, price, imgUrl, isDiscount, CategoryId, publisher, author } = val
        return `( '${name}', ${price}, '${imgUrl}', ${isDiscount}, ${CategoryId}, '${publisher}', '${author}' )`
      })
      .join(', \n')

    const query = `INSERT INTO "Books" ("name", "price", "imgUrl", "isDiscount", "CategoryId", "publisher", "author") VALUES ${values};`
    return query
  } catch (error) {
    throw error
  }
}

async function seed () {
  try {
    const queryCategory = await createCategoryQuery()
    const dataCategories = await pool.query(queryCategory)
    if (dataCategories) {
      console.log(`success insert data categories`) 
    }
    const queryBook = await createBookQuery()
    const dataBooks = await pool.query(queryBook)
    if (dataBooks) {
      console.log(`success insert data books`)
    }
  } catch (error) {
    console.log(error)
  }
}

seed().then(() => {
  console.log(`success`)
})