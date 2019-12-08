const jokes = require('../lib/jokes')

module.exports = async ({ bot }) => {
  const run = async (ctx, fn) => {
    const data = await fn(ctx.from)
    ctx.reply(data.joke, {
      parse_mode: 'html'
    })
  }

  bot.command('dadjoke', (ctx) => {
    run(ctx, jokes.dad)
  })

  bot.command('chuckjoke', (ctx) => {
    run(ctx, jokes.chuck)
  })

  bot.command('joke', (ctx) => {
    run(ctx, jokes.random)
  })
}