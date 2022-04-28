const path = require('path')
const fs = require('fs')

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const dashboardRoutes = require('./routes/dashboard')

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use(dashboardRoutes)

app.use('*', (req, res, next) => {
    res.send('404!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))
