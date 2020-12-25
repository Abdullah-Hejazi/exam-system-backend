'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExamSchema extends Schema {
  up () {
    this.create('exams', (table) => {
      table.increments()
      table.string('name', 120).notNullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.integer('duration').notNullable()
      table.datetime('starts_at').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('exams')
  }
}

module.exports = ExamSchema
