const express = require('express')
const request = require('request')
const { jiraUrl, user, password, port } = require('./config/config.local')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/api/search', (req, res) => {
  const options = {
    url: `${jiraUrl}/rest/api/2/search`,
    headers: {
      Authorization: `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`
    },
    qs: req.query,
    method: 'GET'
  }
  req.pipe(request(options)).pipe(res)
})

app.use(express.static('dist'))

app.listen(port)

console.log(`Server listening on port ${port}`) // eslint-disable-line no-console
