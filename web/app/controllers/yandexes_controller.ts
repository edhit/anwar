import type { HttpContext } from '@adonisjs/core/http'
import Yandex from '#models/yandex'

export default class YandexesController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const yandex = await Yandex.find(1) 

    return inertia.render('yandex', { yandex:{ cookie: yandex?.cookie, sk: yandex?.sk, businessid: yandex?.businessid, }})
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, inertia }: HttpContext) {
    const data = request.all()

    let yandex = await Yandex.find(1)

    if (!yandex) {
      yandex = await Yandex.create({
        cookie: data.cookie,
        sk: data.sk,
        businessid: data.businessid,
      })
    } else {
      yandex.cookie = data.cookie
      yandex.sk = data.sk
      yandex.businessid = data.businessid

      await yandex.save()
    }

    return inertia.render('get_message')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}