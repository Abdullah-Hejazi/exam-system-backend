'use strict'

const { validate } = use('Validator')
const Exam = use('App/Models/Exam')
const UserAnswer = use('App/Models/UserAnswer')

class StudentController {
    async index ({response }) {
        let exams = await Exam.all()

        return response.status(200).send({
            exams: exams
        })
    }

    async exam ({response, params}) {
        let exam = await Exam.findOrFail(params.id)
        let questions = await exam.questions().setHidden(['answer']).fetch()

        return response.status(200).send({
            questions: questions
        })
    }

    async answer ({request, response, params, auth}) {
        const rules = {
            answers: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(401).send({
                message: 'Invalid data !'
            })
        }

        let exam = await Exam.findOrFail(params.id)
        let questions = await exam.questions().fetch()
        let answers = JSON.parse(request.input('answers'))


        let previousAnswers = await UserAnswer.query().where('exam_id', exam.id).where('user_id', auth.user.id).fetch()

        if (previousAnswers.toJSON() !== undefined && previousAnswers.toJSON().length > 0) {
            return response.status(403).send({
                message: 'User already answered this exam before'
            })
        }

        var timeNow = new Date()
        var examStart = new Date(exam.starts_at)
        var examEnd = new Date(examStart.getTime() + exam.duration*60000)

        if (timeNow.getTime() < examStart.getTime()) {
            return response.status(403).send({
                message: 'This exam hasn\'t started yet !'
            })
        }

        if (timeNow.getTime() > examEnd.getTime()) {
            return response.status(403).send({
                message: 'Time has already passed, you can\'t answer this now !'
            })
        }
        
        let timeTaken = Math.ceil((timeNow - examStart) / 60000)
        let marks = 0

        //calculating marks
        questions.toJSON().forEach( function (question) {
            for (var i = 0; i < answers.length; i++) {
                if (answers[i].question_id === question.id) {
                    if (question.answer.toLowerCase() === answers[i].answer.toLowerCase()) {
                        marks += question.marks
                    }
                }
            }

        })


        await UserAnswer.create({
            exam_id: exam.id,
            user_id: auth.user.id,
            answers: request.input('answers'),
            time_taken: timeTaken,
            marks: marks,
        })

        return response.status(200).send({
            marks: marks
        })
    }

}

module.exports = StudentController
