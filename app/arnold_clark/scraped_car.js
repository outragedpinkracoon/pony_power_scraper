const cheerio = require('cheerio')
const rp = require('request-promise')

const carBuilder = require('./car_builder')

const retrieve = async (carUrl, scrapeType) => {
  $ = await carRequest(carUrl)
  return carBuilder.build($, carUrl, scrapeType)
}

const carRequest = async (carUrl) => {
  const response = await rp({ uri: carUrl })
  return cheerio.load(response)
}

module.exports = {
  retrieve
}
