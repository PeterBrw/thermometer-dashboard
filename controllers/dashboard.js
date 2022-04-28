const getDashboard = require('../views/dashboard')
const { Point } = require('@influxdata/influxdb-client')
const { client, org, bucket } = require('../utils/influxConfig')

exports.getDashboard = (req, res, next) => res.send(getDashboard())

exports.postDashboard = (req, res, next) => {
    const writeApi = client.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ host: 'host1' })

    const point = new Point('mem').floatField('used_percent', 23.43234543)
    writeApi.writePoint(point)

    writeApi
        .close()
        .then(() => {
            res.json({ success: true })
        })
        .catch((e) => {
            console.error(e)
            console.log('Finished ERROR')
            res.json({ error: e })
        })
}
