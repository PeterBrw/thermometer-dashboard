const getDashboard = require('../views/dashboard')
const { Point } = require('@influxdata/influxdb-client')
const { client, org, bucket } = require('../utils/influxConfig')

exports.getDashboard = (req, res, next) => {
    return res.send(getDashboard())
}

exports.postDashboard = (req, res, next) => {
    const temp_in = req.query.in
    const temp_out = req.query.out
    const writeApi = client.getWriteApi(org, bucket)

    console.log(temp_in, temp_out)

    writeApi.useDefaultTags({ host: 'host1' })

    const point = new Point('temperature').floatField('in', temp_in).floatField('out', temp_out)
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
