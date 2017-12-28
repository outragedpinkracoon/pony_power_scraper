const rp = require('request-promise')
const cheerio = require('cheerio')

const retrieve = async (params, carsRequested) => {
  const root = 'https://www.arnoldclark.com/used-cars/search'
  const url = `${root}${params}`

  response = await rp({ uri: url })
  $ = cheerio.load(response)

  const carLinks = $('.ac-vehicle__title a')

  const max = carLimit(carsRequested, carLinks)
  return carsLimitedTo(max, carLinks)
}

const carLimit = (carsRequested, carLinks) => {
  let max = carLinks.length
  if (max > carsRequested) {
    max = carsRequested
  }
  return max
}

const carsLimitedTo = (max, carLinks) => {
  const root = 'https://www.arnoldclark.com'

  const results = []
  for (let index = 0; index < max; index++) {
    const href = $(carLinks[index]).attr('href')
    results.push(`${root}${href}`)
  }
  return results
}

module.exports = {
  retrieve
}
