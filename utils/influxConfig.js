const { InfluxDB } = require('@influxdata/influxdb-client')
const config = require('../config')

const token = config.token
const org = config.org
const bucket = config.bucket

const client = new InfluxDB({ url: 'https://us-east-1-1.aws.cloud2.influxdata.com', token: token })

module.exports = {
    client,
    org,
    bucket,
}
