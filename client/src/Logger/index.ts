class Logger {
  debug (...msg: any) {
    console.log(msg)
  }
  error (...msg: any) {
    console.error(msg)
  }
}

export default Logger
