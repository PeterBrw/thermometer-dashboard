const { InfluxDB } = require('@influxdata/influxdb-client')
const config = require('../config')

const token = config.token
const org = config.org
const bucket = config.bucket
const url = config.url

const client = new InfluxDB({ url: url, token: token })

module.exports = {
    client,
    org,
    bucket,
}
