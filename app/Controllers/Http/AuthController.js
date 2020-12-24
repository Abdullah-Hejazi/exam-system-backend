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

        return response.status(200).send({
            token: token.token
        })
    }
}

module.exports = AuthController
