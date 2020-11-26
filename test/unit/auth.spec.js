'use strict'

const { before, beforeEach, after, afterEach, test, trait } = use('Test/Suite')('Auth')

const User = use('App/Models/User')

trait('Test/ApiClient')

before(async () => {
  await User.create({
    'email': 'test@test.com',
    'password': 'password'
  })
})

test('user can signin with email and password', async ({ client }) => {
  const response = await client.post('/signin').send({
    'email': 'test@test.com',
    'password': 'password'
  }).end()

  response.assertStatus(200)
})
