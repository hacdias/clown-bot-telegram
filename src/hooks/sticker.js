module.exports = async ({ bot }) => {
  bot.on('sticker', (ctx) => ctx.reply(`Don't you dare sending me stickers! 🤡`))
}
