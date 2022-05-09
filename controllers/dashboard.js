const getDashboard = require('../views/dashboard')
const { Point } = require('@influxdata/influxdb-client')
const { client, org, bucket } = require('../utils/influxConfig')

exports.getDashboard = (req, res, next) => {
    const queryApi = client.getQueryApi(org)

    const fluxQuery =
        'from(bucket:"thermometer-arduino") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "temperature")'

    queryApi.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
            // the following line creates an object for each row
            const o = tableMeta.toObject(row)
            // console.log(JSON.stringify(o, null, 2))
            console.log(
                `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
            )

            // alternatively, you can get only a specific column value without
            // the need to create an object for every row
            // console.log(tableMeta.get(row, '_time'))

            // or you can create a proxy to get column values on demand
            // const p = new Proxy<Record<string, any>>(row, tableMeta)
            // console.log(
            //  `${p._time} ${p._measurement} in '${p.location}' (${p.example}): ${p._field}=${p._value}`
            // )
        },
        error: (error) => {
            console.error(error)
            console.log('\nFinished ERROR')
        },
        complete: () => {
            console.log('\nFinished SUCCESS')
        },
    })

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
