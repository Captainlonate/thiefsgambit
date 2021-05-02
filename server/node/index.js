const express = require('express')

const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Root')
})

app.get('/spin', (req, res) => {
  res.json({
    example: ['a', 'b', 'c', '1', '2', '3']
  })
})

app.get('/friends', (req, res) => {
  res.json([
    { name: 'nathan' },
    { name: 'lucca' },
    { name: 'ygritte' }
  ])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
