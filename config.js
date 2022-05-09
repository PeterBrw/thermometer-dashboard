const dotenv = require('dotenv')

dotenv.config()

const { INFLUX_TOKEN, ORG, BUCKET, URL } = process.env

module.exports = {
    token: INFLUX_TOKEN,
    org: ORG,
    bucket: BUCKET,
    url: URL
}
