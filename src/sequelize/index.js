const { Sequelize, DataTypes } = require("sequelize")
const fs = require("fs")
const path = require("path")

function connect() {
  const url = process.env.DATABASE_URL
  const sequelize = new Sequelize(url, { define: { underscored: true } })
  return sequelize
}

function init(sequelize) {
  const modelsPath = path.join(__dirname, "models")

  const models = fs.readdirSync(modelsPath).reduce(function (obj, file) {
    const modelName = file.replace(/.js$/, "")
    obj[modelName] = require("./models/" + modelName)(sequelize, DataTypes)
    return obj
  }, {})

  Object.entries(models).forEach(function ([name, model]) {
    model.associate(models)
  })
}

const sequelize = connect()
init(sequelize)

module.exports = {
  sequelize
}