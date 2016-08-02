'use strict'

function * bodyBuilder (next) {
  this.body = {
    links: {},
    meta: {
      start_ms: Date.now()
    }
  }

  yield next

  if (Array.isArray(this.body.data)) {
    this.body.meta.count = this.body.data.length
  }

  this.body.meta.end_ms = Date.now()
  this.body.meta.response_ms = (this.body.meta.end_ms - this.body.meta.start_ms)
}





module.exports = function () {
  return bodyBuilder
}
