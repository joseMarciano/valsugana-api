module.exports = {
  development: {
    username: "dev-valsugana",
    password: "123456",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",

    schema: "valsugana",
    searchPath: "valsugana",
    dialectOptions: {
      prependSearchPath: true
    },
    define: {
      freezeTableName: true,
      timestamps: true,
      chartSet: 'utf8'
    }
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
