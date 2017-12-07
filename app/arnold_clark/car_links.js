const rp = require('request-promise')
const cheerio = require('cheerio')
const root = 'https://www.arnoldclark.com'

const retrieve = async (url, numberOfCars) => {
  response = await rp({ uri: url })
  $ = cheerio.load(response)

  const links = $('.ac-vehicle__title a')
  const results = []
  for (let index = 0; index < numberOfCars; index++) {
    const href = $(links[index]).attr('href')
    results.push(`${root}${href}`)
  }
  return results
}

module.exports = {
  retrieve
}
