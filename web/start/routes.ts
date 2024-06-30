/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import PopularsController from '#controllers/populars_controller'
import YandexesController from '#controllers/yandexes_controller'
import router from '@adonisjs/core/services/router'
// router.on('/').renderInertia('home',  { version: 6 })

router.on('/').renderInertia('main')
router.resource('/popular', PopularsController)  
router.resource('/yandex', YandexesController) 

