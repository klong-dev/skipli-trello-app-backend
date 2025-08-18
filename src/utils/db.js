const {Sequelize} = require("sequelize");

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "postgres";
const DB_TYPE = process.env.DB_TYPE || "postgres";

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_TYPE,
});

connect = async () => {
    sequelize.authenticate().then(() => {
        console.log('DB Connected ✅');
    }).catch((err) => {
        console.log(err.message);
    });
    await sequelize.sync({alter: true});
}

module.exports = {sequelize, connect};