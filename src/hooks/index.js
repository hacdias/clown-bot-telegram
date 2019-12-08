const fs = require('fs-extra')
const debug = require('debug')('bot:hooks')

module.exports = async (stuff) => {
  const commands = []

  for (const file of await fs.readdir(__dirname)) {
    if (file === 'index.js') continue

    const name = file.replace('.js', '')
    const register = require(`./${file}`)

    await register(stuff)
    debug(`${name} registered`)
  }

  return commands
}
