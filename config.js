const dotenv = require('dotenv')

dotenv.config()

const { INFLUX_TOKEN, ORG, BUCKET } = process.env

module.exports = {
    token: INFLUX_TOKEN,
    org: ORG,
    bucket: BUCKET,
}
