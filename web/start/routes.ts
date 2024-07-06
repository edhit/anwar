/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import InstructionsController from '#controllers/instructions_controller'
import PopularsController from '#controllers/populars_controller'
import StopwordsController from '#controllers/stopwords_controller'
import YandexesController from '#controllers/yandexes_controller'
import router from '@adonisjs/core/services/router'
// router.on('/').renderInertia('home',  { version: 6 })

router.on('/').renderInertia('main')
router.resource('/popular', PopularsController)
router.resource('/yandex', YandexesController)
router.resource('/stopwords', StopwordsController)
router.resource('/instructions', InstructionsController)
