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
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,

    schema: process.env.DB_SCHEMA,
    searchPath: process.env.DB_SEARCH_PATH,
    dialectOptions: {
      ssl:{
        rejectUnauthorized: false
      },
      prependSearchPath: true
    },
    define: {
      freezeTableName: true,
      timestamps: true,
      chartSet: 'utf8'
    }
  }
}