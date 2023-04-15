const dotEnv = require('dotenv')
const SequelizeAuto = require('sequelize-auto')
const path = require('path')
const { Sequelize } = require('sequelize')

dotEnv.config({})
const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'coinscasino',
    username: process.env.MYSQL_USERNAME || 'root',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '123@123Aa',
    port: +process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
}
const main = async () => {
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
            ...config,
            logging: false,
            dialect: 'mysql',
        }
    )

    const options = {
        caseFile: 'c',
        caseModel: 'c',
        caseProp: 'c',
        directory: path.resolve(process.cwd(), 'models', 'mysql'),
        additional: {
            timestamps: false,
        },
        lang: 'ts',
    }
    const auto = new SequelizeAuto(sequelize, null, null, options)
    auto.run()
}

main()
