const rp = require('request-promise')
const cheerio = require('cheerio')

const numberOfCars = 5
const root = 'https://www.arnoldclark.com'
const searchRoot = 'https://www.arnoldclark.com/used-cars/search'

const retrieve = async (params) => {
  const url = `${searchRoot}${params}`

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
