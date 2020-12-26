'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('login', 'AuthController.login').middleware('guest')
Route.post('create', 'AuthController.create').middleware('guest')

// Students
Route.group(() => {
    Route.get('home', 'StudentController.index')
    Route.get('exam/:id', 'StudentController.exam')
    Route.post('exam/:id/answer', 'StudentController.answer')
}).prefix('students').middleware(['auth', 'student'])

// Professors
Route.group(() => {
    Route.get('home', 'ProfessorController.index')
    Route.post('exam/new', 'ProfessorController.newExam')
    Route.post('exam/:id/questions/add', 'ProfessorController.addQuestion')
}).prefix('professors').middleware(['auth', 'professor'])