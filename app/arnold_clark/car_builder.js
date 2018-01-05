const {
  productSummary,
  techSpecs,
  reactProps,
  videoDataTable
} = require('./car_page_sections')

const build = ($, carUrl, scrapeType) => {
  const attributes = attributesFromHtml($)

  attributes.carUrl = carUrl
  attributes.makeSlug = slugify(attributes.make)
  attributes.searchType = scrapeType

  return attributes
}

const attributesFromHtml = ($) => {
  return {
    bodyType: videoDataTable($, 'Body Type'),
    colour: productSummary($, 'Colour'),
    cost: {
      price: price($),
      roadTax: roadTax($)
    },
    engine: {
      acceleration: asIntValueOrZero($, techSpecs, '0 to 62 mph (secs)'),
      breakHorsePower: asIntValueOrZero($, techSpecs, 'Engine Power - BHP'),
      engineSize: engineSize($),
      fuel: productSummary($, 'Fuel'),
      fuelTankCapacity: asIntValueOrZero($, techSpecs, 'Fuel Tank Capacity (Litres)'),
      mpg: asFloatValueOrZero($, productSummary, 'MPG (combined)')
    },
    imageUrl: image($),
    make: videoDataTable($, 'Make'),
    mileage: asIntValueOrZero($, productSummary, 'Mileage'),
    model: videoDataTable($, 'Model'),
    registration: registration($),
    seats: asIntValueOrZero($, productSummary, 'Seats'),
    towing: {
      maxTowingWeightBraked: asIntValueOrZero($, techSpecs, 'Max. Towing Weight - Braked'),
      maxTowingWeightUnbraked: asIntValueOrZero($, techSpecs, 'Max. Towing Weight - Unbraked'),
      minimumKerbWeight: asIntValueOrZero($, techSpecs, 'Minimum Kerbweight'),
    },
    turningCircle: asFloatValueOrZero($, techSpecs, 'Turning Circle - Kerb to Kerb'),
    year: asIntValueOrZero($, productSummary, 'Year'),
  }
}

const engineSize = ($) => {
  engineCC = defaultToZero(
    parseFloat(
      productSummary($, 'Engine').replace('cc', '')
    )
  )
  if (engineCC == 0) return 0

  engineLitres = engineCC / 1000.00

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
  return defaultToZero(parsed)
}

const asIntValueOrZero = ($, section, term) => {
  parsed = parseInt(
    section($, term)
  )
  return defaultToZero(parsed)
}

const asFloatValueOrZero = ($, section, term) => {
  parsed = parseFloat(
    section($, term)
  )
  return defaultToZero(parsed)
}

const defaultToZero = (value) => {
  return isNaN(value) ? 0 : value
}

const slugify = (make) => {
  return make.toLowerCase().replace(' ', '-')
}

module.exports = {
  build
}
