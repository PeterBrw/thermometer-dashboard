const path = require('path')

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const dashboardRoutes = require('./routes/dashboard')
const { client, org } = require('./utils/influxConfig')

const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use(dashboardRoutes)

app.use('*', (req, res, next) => {
    res.send('404!')
})

io.on('connection', (socket) => {
    console.log('user connected')

    const queryApi = client.getQueryApi(org)

    const fluxQuery =
        'from(bucket:"thermometer-arduino") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "temperature") |> sort() |> limit(n: 2) '

    queryApi.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
            const o = tableMeta.toObject(row)
            // console.log(JSON.stringify(o, null, 2))
            console.log(
                `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
            )

            socket.emit('temperatures', o)
        },
        error: (error) => {
            console.error(error)
            console.log('\nFinished ERROR')
        },
        complete: () => {
            console.log('\nFinished SUCCESS')
        },
    })

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
})

server.listen(port, function () {
    console.log(`Listening on port ${port}`)
})
