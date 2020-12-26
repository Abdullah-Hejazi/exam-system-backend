'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Professor {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    if (auth.user && auth.user.role == 'professor') {
      await next()
    } else {
      return response.status(401).send({
        message: 'Your account is not a professor account !!'
      })
    }
  }
}

module.exports = Professor
