const rp = require('request-promise')
const cheerio = require('cheerio')

const scrape = (carUrl) => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: carUrl,
      transform: (body) => {
        return cheerio.load(body)
      }
    }

    rp(options)
      .then(($) => {
        car = {
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
        return resolve(car)
      })
      .catch((err) => {
        reject(err)
      })
  })
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
  let price = $('.ac-money').first().text()
  return parseInt(
    price.replace('£', '')
         .replace(',', '')
  )
}

const roadTax = ($) => {
  return parseInt(
    productSummary($, 'Road tax')
      .replace(' per year', '')
      .replace('£', '')
  )
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
