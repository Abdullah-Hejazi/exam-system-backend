'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAnswerSchema extends Schema {
  up () {
    this.create('user_answers', (table) => {
      table.increments()
      table.integer('exam_id').notNullable().unsigned().references('id').inTable('exams')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.text('answers').notNullable()
      table.integer('time_taken')
      table.integer('marks').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_answers')
  }
}

module.exports = UserAnswerSchema
