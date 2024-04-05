class View {
  static showTable (data) {
    console.table(data)
  }

  static showError (error) {
    console.log(error.message)
  }
}

module.exports = View
