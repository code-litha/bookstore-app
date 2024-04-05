const pool = require('../config/connection')

const createCategoryQuery = `
  CREATE TABLE IF NOT EXISTS "Categories"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
  );
`

const createBookQuery = `
  CREATE TABLE IF NOT EXISTS "Books"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "imgUrl" VARCHAR(255) NOT NULL,
    "synopsis" TEXT,
    "isDiscount" BOOLEAN,
    "publisher" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "CategoryId" INTEGER,
    FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id")
  );
`

async function migration () {
  try {
    const dropTable = await pool.query(`DROP TABLE IF EXISTS "Categories", "Books"`)
    if (dropTable) {
      console.log(`success drop table`)
    }

    const tableCategory = await pool.query(createCategoryQuery)
    if (tableCategory) {
      console.log('success create table Category')
    }
    
    const tableBook = await pool.query(createBookQuery)
    if (tableBook) {
      console.log('success create table Book')
    }
  } catch (error) {
    console.log(error)
  }
}

migration()