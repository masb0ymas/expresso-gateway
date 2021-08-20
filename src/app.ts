import withState from '@expresso/helpers/withState'
import winstonLogger, { winstonStream } from 'config/winston'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import userAgent from 'express-useragent'
import helmet from 'helmet'
import hpp from 'hpp'
import createError from 'http-errors'
import ExpressErrorResponse from 'middlewares/ExpressErrorResponse'
import ExpressRateLimit from 'middlewares/ExpressRateLimit'
import logger from 'morgan'
import path from 'path'
import requestIp from 'request-ip'
import indexRouter from 'routes'

const GenerateDoc = require('utils/GenerateDocs')

const { NODE_ENV } = process.env
const app = express()

// view engine setup
app.set('views', path.join(`${__dirname}/../`, 'views'))
app.set('view engine', 'pug')

app.use(helmet())
app.use(cors())
app.use(logger('combined', { stream: winstonStream }))
app.use(express.json({ limit: '100mb', type: 'application/json' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(`${__dirname}/../`, 'public')))

app.use(hpp())
app.use(userAgent.express())
app.use(requestIp.mw())
app.use(ExpressRateLimit)

app.use((req: Request, res, next: NextFunction) => {
  new withState(req)
  next()
})

// disable for production mode
if (NODE_ENV !== 'production') {
  // Initial Docs Swagger
  GenerateDoc(app)
}

// Initial Route
app.use(indexRouter)
app.use(ExpressErrorResponse)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // add this line to include winston logging
  winstonLogger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
