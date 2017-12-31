const {
  productSummary,
  techSpecs,
  reactProps,
  videoDataTable
} = require('./car_page_sections')

const build = ($, carUrl) => {
  return {
    bodyType: videoDataTable($, 'Body Type'),
    carUrl: carUrl,
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
    turningCircle: asIntValueOrZero($, techSpecs, 'Turning Circle - Kerb to Kerb'),
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

const defaultToZero = (value) => {
  return isNaN(value) ? 0 : value
}

module.exports = {
  build
}
