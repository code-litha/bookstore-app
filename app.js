const commands = process.argv.slice(2)
const cmd = commands[0]
const Controller = require('./controllers/controller')

switch(cmd) {
  case 'listCategories': {
    Controller.listCategories()
    break
  }
  case 'listBooks': {
    Controller.listBooks()
    break
  }
  default: break
}