import Command from '#models/command'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { exec } from 'child_process'
import path from 'path'


export default class PopularsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const command = (await Command.findManyBy('type', 'popular')).toReversed()
    
    return inertia.render('popular', { commands: command })
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
    const file = request.file('file')
    const __dirname = path.resolve().replace('web', 'programms');

    let path_file
    if (file) {
      const name = `${cuid()}.${file.extname}`      

      await file.move(app.makePath('uploads'), {
        name: `${name}`
      })

      path_file = `web/uploads/${name}`
    }
    
    const command = `node ${__dirname} popular ${path_file} ${data.letter} ${data.price} ${data.type} ${data.opinion} ${data.rate} ${data.name}`
    // console.log(command);
    
    await Command.create({
      command: command,
      type: 'popular',
      name: data.name
    }) 

    if (process.platform === 'win32') {
      exec(`start cmd.exe /K ${command}`);
    }
    // выввести инструкцию и благодарность
    return inertia.render('get_command', { commands: command })
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