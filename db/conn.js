const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL||'postgres://localhost/dir_with_managers_db')

module.exports = conn;