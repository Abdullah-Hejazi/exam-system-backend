'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.text('question').notNullable()
      table.integer('exam_id').notNullable().unsigned().references('id').inTable('exams')
      table.enu('type', ['truefalse', 'multichoice']).notNullable()
      table.string('options', 500).default(null)
      table.string('answer', 200).notNullable()
      table.integer('marks').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
