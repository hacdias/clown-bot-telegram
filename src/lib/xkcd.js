const fetch = require('node-fetch')
const debug = require('debug')('bot:xkcd')

let latestData = null
let latestFetchTime = null
const cache = {}

const fetchLatest = async () => {
  debug('fetching latest')
  if (!latestData || Date.now() - latestFetchTime >= 60 * 60 * 1000) {
    const res = await fetch('https://xkcd.com/info.0.json')
    latestData = await res.json()
    latestFetchTime = Date.now()
    cache[latestData.num] = latestData
    debug('fetched latest')
  } else {
    debug('latest found in cache')
  }
}

const getLatest = async () => {
  await fetchLatest()
  return latestData
}

const getSpecific = async (num = null) => {
  await fetchLatest()

  if (num === null) {
    num = Math.floor(Math.random() * latestData.num) + 1
  }

  debug(`fetching ${num}`)

  let data

  if (cache[num]) {
    data = cache[num]
  } else {
    const res = await fetch(`https://xkcd.com/${num}/info.0.json`)
    data = await res.json()
  }

  debug(`fetched ${num}`)
  return data
}

const getRandom = async () => {
  return getSpecific(null)
}

module.exports = {
  getRandom,
  getSpecific,
  getLatest
}
