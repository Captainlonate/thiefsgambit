export class Logger {
  debug (...msg) {
    console.log("%c(ℹ)%c", "color: white; background: #3ec2ff;", "", ...msg);
  }

  error (...msg) {
    console.error("%c(X)%c", "color: yellow; background: #e04800;", "", ...msg);
  }

  logEnvironment () {
    this.debug("Environment: " + process.env.NODE_ENV)
  }

  logTime (...msg) {
    const d = new Date()
    const time = (d.toLocaleString)
      ? d.toLocaleString('en-US')
      : `${d.getHours()}:${d.getSeconds()}:${d.getMilliseconds()}`

    this.debug(time, ...msg)
  }
}

const logger = new Logger()

export default logger
