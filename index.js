const path = require('path')

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const dashboardRoutes = require('./routes/dashboard')

const app = express()
const server = require('http').createServer(app);
const port = process.env.PORT || 3000
const io = require('socket.io')(server);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use(dashboardRoutes)

app.use('*', (req, res, next) => {
    res.send('404!')
})

io.on('connection', (socket) => {
    console.log('user connected');

    socket.emit("hello", "world")

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
})


server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
