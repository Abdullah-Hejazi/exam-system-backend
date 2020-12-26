'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class AuthController {
    async login ({ auth, request, response }) {
        const rules = {
            email: 'required|email',
            password: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(401).send({
                message: 'Invalid data !'
            })
        }

        const { email, password } = request.all()
        var token = await auth.attempt(email, password)

        var user = await User.query().where('email', email).first()

        return response.status(200).send({
            token: token.token,
            role: user.role,
            name: user.name
        })
    }

    async create({request, response}) {
        const rules = {
            email: 'required|email',
            password: 'required',
            name: 'required',
            role: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(401).send({
                message: 'Invalid data !'
            })
        }

        let userData = request.only(['email', 'password', 'role', 'name'])

        try {
            let user = await User.create(userData)
        } catch(e) {
            return response.status(401).send({
                message: 'Something went wrong when creating the user.'
            })
        }

        return response.status(200).send({
            message: 'OK'
        })
    }
}

module.exports = AuthController
