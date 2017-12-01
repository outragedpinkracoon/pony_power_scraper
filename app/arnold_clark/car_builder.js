const cheerio = require('cheerio')
const rp = require('request-promise')

const scrape = async (carUrl) => {
  $ = await carRequest(carUrl)
  return buildCar($, carUrl)
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

const buildCar = ($, carUrl) => {
  return {
    imageUrl: image($),
    price: price($),
    make: videoDataTable($, 'Make'),
    model: videoDataTable($, 'Model'),
    year: year($),
    mileage: productSummary($, 'Mileage'),
    bodyType: videoDataTable($, 'Body Type'),
    mpg: productSummary($, 'MPG (combined)'),
    roadTax: roadTax($),
    seats: seats($),
    colour: productSummary($, 'Colour'),
    engine: engine($),
    fuel: productSummary($, 'Fuel'),
    carUrl: carUrl
  }
}

const engine = ($) => {
  engineCC = parseFloat(
    productSummary($, 'Engine').replace('cc', '')
  )

  engineLitres = engineCC / 1000

  return parseFloat(
    engineLitres.toFixed(2)
  )
}

const image = ($) => {
  return $('.ac-imagethumbnail img').first().attr('src')
}

const price = ($) => {
  debugger
  let price = $('.ac-money').first().text()
  return parseInt(
    price.replace('£', '')
         .replace(',', '')
  )
}

const roadTax = ($) => {
  const parsed = parseInt(
    productSummary($, 'Road tax')
      .replace(' per year', '')
      .replace('£', '')
  )
  return isNaN(parsed) ? 0 : parsed
}

const seats = ($) => {
  return parseInt(
    productSummary($, 'Seats')
  )
}

const year = ($) => {
  return parseInt(
    productSummary($, 'Year')
  )
}

const productSummary = ($, term) => {
  return textOfSibling(
    $(`table.ac-product__summary th:contains('${term}')`)
  )
}

const textOfSibling = (element) => {
  return element.next().text()
}

const videoDataTable = ($, term) => {
  return textOfSibling(
    $(`#video_data_table .ac-product__summary dt:contains('${term}')`)
  )
}

module.exports = {
  scrape
}
