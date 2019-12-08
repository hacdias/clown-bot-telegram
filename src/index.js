const Telegraf = require('telegraf')
const setupHooks = require('./hooks')
const debug = require('debug')('bot:telegram')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { leave } = Stage

;(async () => {
  debug('starting Telegram bot')

  const stage = new Stage()
  stage.command('cancel', leave())

  const bot = new Telegraf(process.env.TELEGRAM)

  bot.use(session())
  bot.use(stage.middleware())

  bot.catch((err, ctx) => {
    debug(err)
    ctx.reply('Something wrong happened... sorry.')
  })

  await setupHooks({ bot, stage })
  bot.launch()
})()
