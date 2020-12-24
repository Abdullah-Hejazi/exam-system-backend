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

test('user can login with email and password', async ({ client }) => {
  const response = await client.post('/login').send({
    'email': 'test@test.com',
    'password': 'password'
  }).end()

  response.assertStatus(200)
})

test('user get error when wrong email', async ({ client }) => {
  const response = await client.post('/login').send({
    'email': 'test@test.com22',
    'password': 'password'
  }).end()

  response.assertStatus(401)
})

test('user get error when wrong password', async ({ client }) => {
  const response = await client.post('/login').send({
    'email': 'test@test.com',
    'password': 'password22'
  }).end()

  response.assertStatus(401)
})