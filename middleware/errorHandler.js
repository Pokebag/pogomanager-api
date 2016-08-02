'use strict'

function * errorHandler (next) {
  try {
    yield next

  } catch (error) {
    this.status = error.status || 500
    this.body.errors = [
      error.message
    ]

    if (typeof this.body === 'string') {
      this.body = JSON.parse(this.body)
    }

    this.body.meta.end_ms = Date.now()
    this.body.meta.response_ms = (this.body.meta.end_ms - this.body.meta.start_ms)

    this.app.emit('error', error, this)
  }
}





module.exports = function () {
  return errorHandler
}
