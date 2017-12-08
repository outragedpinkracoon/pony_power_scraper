const cheerio = require('cheerio')

const build = ($, carUrl) => {
  return {
    bodyType: videoDataTable($, 'Body Type'),
    breakHorsePower: breakHorsePower($),
    carUrl: carUrl,
    colour: productSummary($, 'Colour'),
    engine: engine($),
    fuel: productSummary($, 'Fuel'),
    imageUrl: image($),
    make: videoDataTable($, 'Make'),
    mileage: productSummary($, 'Mileage'),
    model: videoDataTable($, 'Model'),
    mpg: productSummary($, 'MPG (combined)'),
    price: price($),
    registration: registration($),
    roadTax: roadTax($),
    seats: seats($),
    year: year($)
  }
}

const breakHorsePower = ($) => {
  return parseInt(
    technicalSpecification($, 'Engine Power - BHP')
  )
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

const registration = ($) => {
  return reactProps($).registration
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

const technicalSpecification = ($, term) => {
  const html = cheerio.load(reactProps($).specification.technical)
  return textOfSibling(
    html(`th:contains('${term}')`)
  )
}

const reactProps = ($) => {
  return JSON.parse(
    // eslint-disable-next-line quotes
    $("div[data-react-class='vehicles/show/productPageContainer']")
      .attr('data-react-props'))
    .vehicle
}

const videoDataTable = ($, term) => {
  return textOfSibling(
    $(`#video_data_table .ac-product__summary dt:contains('${term}')`)
  )
}

const textOfSibling = (element) => {
  return element.next().text()
}

module.exports = {
  build
}
