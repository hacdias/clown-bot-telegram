const { getRandom, getLatest, getSpecific } = require('../lib/xkcd')

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const reply = ({ replyWithPhoto }, data) => {
  replyWithPhoto(data.img, {
    caption: `*${data.title}* - ${data.alt}`,
    parse_mode: 'markdown'
  })
}

const { leave } = Stage

const xkcd = new Scene('xkcd')

xkcd.enter(async (ctx) => {
  ctx.reply(`Let's have some XKCD time! You can send me the number of one of the comics, or say latest or random. You can cancel with /cancel.`)
})

xkcd.on('message', async (ctx) => {
  const text = ctx.message.text.trim()
  let data

  switch (text) {
    case 'random':
      data = await getRandom()
      break
    case 'latest':
      data = await getLatest()
      break
    default:
      const num = Number(text)
      if (Number.isInteger(num)) {
        data = await getSpecific(num)
      } else {
        ctx.reply(`Sorry, but I can't understand what you're saying...`)
        return
      }

      break
  }

  reply(ctx, data)
  leave()(ctx)
})

module.exports = async ({ bot, stage }, debug) => {
  stage.register(xkcd)
  
  bot.command('xkcd', (ctx) => ctx.scene.enter('xkcd'))

  bot.command('latestxkcd', async (ctx) => {
    reply(ctx, await getLatest())
  })

  bot.command('randomxkcd', async (ctx) => {
    reply(ctx, await getRandom())
  })
}