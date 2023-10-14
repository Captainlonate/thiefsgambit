export class Logger {
  // IGNORE-REASON: It's ok to accept `any` type here, because we're just
  // IGNORE-REASON: passing the arguments to `console.log`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(...msg: any[]) {
    console.log('%c(ℹ)%c', 'color: white; background: #3ec2ff;', '', ...msg)
  }

  // IGNORE-REASON: It's ok to accept `any` type here, because we're just
  // IGNORE-REASON: passing the arguments to `console.log`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(...msg: any[]) {
    console.error('%c(X)%c', 'color: yellow; background: #e04800;', '', ...msg)
  }

  logEnvironment() {
    this.debug('Environment: ' + import.meta.env.MODE)
  }

  // IGNORE-REASON: It's ok to accept `any` type here, because we're just
  // IGNORE-REASON: passing the arguments to `console.log`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logTime(...msg: any[]) {
    const d = new Date()
    const time = d.toLocaleString
      ? d.toLocaleString('en-US')
      : `${d.getHours()}:${d.getSeconds()}:${d.getMilliseconds()}`

    this.debug(time, ...msg)
  }
}

const logger = new Logger()

export default logger
