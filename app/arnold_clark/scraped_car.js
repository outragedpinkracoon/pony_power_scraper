const cheerio = require('cheerio')
const rp = require('request-promise')

const carBuilder = require('./car_builder')

const retrieve = async (carUrl) => {
  $ = await carRequest(carUrl)
  return carBuilder.build($, carUrl)
}

const carRequest = (carUrl) => {
  const options = {
    uri: carUrl,
    transform: (body) => {
      return cheerio.load(body)
    }
  }

  return rp(options)
}

module.exports = {
  retrieve
}
