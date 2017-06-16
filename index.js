'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const getDomains = require('./domains')
const { PORT = 5151 } = process.env

app.use(cors())

app.get('/api/v1/sending-domains', (req, res) => {
  res.status(200).send({
    results: getDomains({ n: 1000 })
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})