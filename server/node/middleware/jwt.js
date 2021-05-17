const jwt = require('jsonwebtoken')

const { makeFailedResponse } = require('../controllers/responseUtils')

/*
  Middleware that checks if the current request has
  a valid JWT token within their cookies. Will attempt
  to verify it with a the same secret used to sign it.
  If there is no JWT, or if it's invalid / unverifiable,
  then the middleware will immediately respond to the client
  and will not allow further middleware / handlers to run.
  If the JWT is valid, the payload will be attached to res.locals{}.
*/
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
      process.env.JWT_SIGN_KEY,
      {
        algorithms: ['HS256']
      }
    )
    res.locals.userId = payload.uuid
    res.locals.userName = payload.username
    res.locals.isElite = payload.iselite
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

module.exports = JWTMiddleware
