module.exports = async ({ bot }) => {
  bot.start(async ({ from, reply }) => {
    reply(`Welcome ${from.first_name}! 🤡 Please try out /help to see what I can do.`)
  })
}
