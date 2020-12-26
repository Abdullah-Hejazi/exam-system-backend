'use strict'

const { validate } = use('Validator')
const Exam = use('App/Models/Exam')
const Question = use('App/Models/Question')

class ProfessorController {
    async index ({response }) {
        let exams = await Exam.all()

        return response.status(200).send({
            exams: exams
        })
    }

    async newExam ({response, request, auth}) {
        const rules = {
            starts_at: 'required',
            name: 'required',
            duration: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(401).send({
                message: 'Invalid data !'
            })
        }

        let exam = await Exam.create({
            user_id: auth.user.id,
            starts_at: new Date(request.input('starts_at')),
            duration: request.input('duration'),
            name: request.input('name')
        })

        return response.status(200).send({
            id: exam.id
        })
    }
    
    async addQuestion ({response, request, params}) {
        const rules = {
            question: 'required',
            type: 'required',
            options: 'required',
            answer: 'required',
            marks: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(401).send({
                message: 'Invalid data !'
            })
        }

        let exam = await Exam.findOrFail(params.id)

        await Question.create({
            question: request.input('question'),
            answer: request.input('answer'),
            options: request.input('options'),
            type: request.input('type'),
            marks: request.input('marks'),
            exam_id: exam.id
        })

        return response.status(200).send({
            message: 'OK'
        })
    }
}

module.exports = ProfessorController
