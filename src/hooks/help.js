const commands = [
  ['dadjoke', 'cracks a dad joke'],
  ['chuckjoke', 'cracks a Chuck Norris joke'],
  ['joke', 'cracks a random joke'],
  ['latestxkcd', 'gets the latest xkcd comic'],
  ['randomxkcd', 'gets a random xkcd comic'],
  ['xkcd', 'allows to specify an xkcd comic']
].map(el => el.join(' - '))

const text = commands.map(el => `/${el}`).join('\n')

module.exports = async ({ bot }) => {
  console.log(commands.join('\n'))

  bot.help(async ({ reply }) => {
    reply(`Here's what I can do:\n\n${text}`)
  })
}
