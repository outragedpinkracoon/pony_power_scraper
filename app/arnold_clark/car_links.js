const rp = require('request-promise')
const cheerio = require('cheerio')

const scrape = async (searchType, carsRequested = 24, pageNumber = 1) => {
  const root = 'https://www.arnoldclark.com/used-cars/search'
  const url = `${root}${params(searchType, pageNumber)}`

  response = await rp({ uri: url })
  $ = cheerio.load(response)

  const carLinks = $('.ac-vehicle__title a')
  const numberOfCarLinks = carLinks.length

  const max = carLimit(carsRequested, numberOfCarLinks)
  return {
    total_pages: totalPages(),
    current_page: pageNumber,
    total_cars: carLinks.length,
    car_data: carsLimitedTo(max, carLinks)
  }
}

const totalPages = () => {
  return parseInt(
    $('.ac-pagination__button--last')[0].attribs['data-page-number']
  )
}

const carLimit = (carsRequested, numberOfCarLinks) => {
  let max = carsRequested
  if (numberOfCarLinks < max) {
    max = numberOfCarLinks
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

const params = (searchType, pageNumber) => {
  return [
    `?search_type=${searchType}`,
    '&payment_type=cash',
    '&max_price=10000',
    '&location=Edinburgh%20EH17%2C%20UK',
    '&distance=100',
    '&photos_only=true',
    '&unreserved_only=true',
    '&transmission=Manual',
    '&mpg=50',
    '&mileage=10000',
    '&age=2',
    '&min_engine_size=1345',
    '&body_type%5B%5D=Hatchback',
    '&body_type%5B%5D=Estate',
    '&body_type%5B%5D=Saloon',
    '&body_type%5B%5D=SUV',
    '&body_type%5B%5D=People%20carrier',
    '&doors%5B%5D=5',
    '&seats%5B%5D=4',
    '&seats%5B%5D=5',
    '&seats%5B%5D=7',
    '&sort_order=price',
    `&page=${pageNumber}`
  ].join('')
}

module.exports = {
  scrape
}
