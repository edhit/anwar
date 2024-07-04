import Command from '#models/command'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { exec } from 'child_process'
import path from 'path'

export default class StopwordsController {
  /**
   * Display a list of resource
   */
  async index({inertia}: HttpContext) {
    const command = (await Command.findManyBy('type', 'stopwords')).toReversed()
    
    return inertia.render('stopwords', { commands: command })
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
// console.log(data.words.split(','));
    let words = []
    for (const value of data.words.split(',')) {
      if (value.trim() != "") words.push(value.trim())
    }

    const command = `node ${__dirname} stopwords ${path_file} [${words.join(',')}] ${data.name}`
  
    await Command.create({
      command: command,
      type: 'stopwords',
      name: data.name
    })     

    if (process.platform === 'win32') {
      exec(`start cmd.exe /K "cd uploads && ${command}"`);
    }
    // выввести инструкцию и благодарность
    return inertia.render('get_command', { commands: command })    
  }

  /**
   * Show individual record
   */
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