const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express()

process.title = 'Slots Chat'

app.use(cors({
  origin: true,
  credentials: true
}))
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse application/json content-type
app.use(express.json())
//
app.use(cookieParser())

const port = 3002

const mockMessages = [
  { id: '1', them: false, author: 'Me', message: 'Hello' },
  { id: '2', them: true, author: 'Regina', message: 'Morning' },
  { id: '3', them: false, author: 'Me', message: 'Hello' },
  { id: '4', them: true, author: 'Regina', message: 'Morning' },
  { id: '5', them: false, author: 'Me', message: 'Hello' },
  { id: '6', them: true, author: 'Regina', message: 'Morning' },
  { id: '7', them: false, author: 'Me', message: 'Hello' },
  { id: '8', them: true, author: 'Regina', message: 'Morning' },
  { id: '9', them: false, author: 'Me', message: 'Hello' },
  { id: '10', them: true, author: 'Regina', message: 'Morning' },
  { id: '11', them: false, author: 'Me', message: 'Hello' },
  { id: '12', them: true, author: 'Regina', message: 'Morning' },
  { id: '13', them: true, author: 'Regina', message: 'Morning' },
  { id: '14', them: true, author: 'Regina', message: 'Morning' },
]

const makeFailedResponse = (errorCode, message) => ({
  success: false,
  error: {
    error_code: errorCode,
    human_msg: message,
    err: null
  },
  data: null
})

const JWTMiddleware = (req, res, next) => {
  const accessToken = req.cookies.jwt

  if (!accessToken) {
    console.log('NO ACCESS TOKEN')
    return res.json(
      makeFailedResponse('not_logged_in', 'Missing/No Token.')
    )
  }

  try {
    const payload = jwt.verify(
      accessToken,
      '',
      {
        algorithms: ['HS256']
      }
    )
    res.locals.userId = payload.uuid
    res.locals.userName = payload.username
    res.locals.email = payload.email
    res.locals.expiration = payload.Exp
    res.locals.authenticatedJWT = true
    next()
  } catch (ex) {
    console.log(`Error when jwt.verify(accessToken):\n\t${ex.message}\n`)
    return res.json(
      makeFailedResponse('bad_token', 'Bad/Malformed/Unverifiable Token.')
    )
  }
}

app.get('/recentchats/:roomId', JWTMiddleware, (req, res) => {
  console.log(`Get chats for room ${req.params.roomId}`)
  console.log('res.locals', JSON.stringify(res.locals, null, 2))
  res.json({
    success: true,
    error: null,
    data: mockMessages
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
