const fetch = require('node-fetch')
const debug = require('debug')('bot:jokes')

const chuck = async (from) => {
  debug('retrieving chuck joke')
  const url = `http://api.icndb.com/jokes/random?firstName=${from.first_name}&lastName=${from.last_name}`

  const res = await fetch(url)
  const data = await res.json()

  debug('chuck joke retrieved')
  return {
    joke: data.value.joke,
    source: 'icndb.com'
  }
}

const dad = async () => {
  debug('retrieving dad joke')
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { 'Accept': 'application/json' }
  })

  debug('dad joke retrieved')
  return {
    joke: (await res.json()).joke,
    source: 'icanhazdadjoke.com'
  }
}

const jokeTypes = [ dad, chuck ]

const random =  async (from) => {
  const joke = jokeTypes[Math.floor(Math.random() * jokeTypes.length)]
  return joke(from)
}

module.exports = {
  chuck,
  dad,
  random
}
