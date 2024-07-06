import type { HttpContext } from '@adonisjs/core/http'
import path from 'path'

export default class InstructionsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const __dirname = path.resolve().replace("\\web", "")
    
    return inertia.render('instructions', { dirname: __dirname.split('\\') })
  }

  // /**
  //  * Display form to create a new record
  //  */
  // async create({}: HttpContext) {}

  // /**
  //  * Handle form submission for the create action
  //  */
  // async store({ request }: HttpContext) {}

  // /**
  //  * Show individual record
  //  */
  // async show({ params }: HttpContext) {}

  // /**
  //  * Edit individual record
  //  */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
