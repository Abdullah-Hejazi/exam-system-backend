'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Exam extends Model {
    questions () {
        return this.hasMany('App/Models/Question')
    }
}

module.exports = Exam
