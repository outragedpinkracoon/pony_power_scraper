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
      acceleration: acceleration($),
      breakHorsePower: breakHorsePower($),
      engineSize: engineSize($),
      fuel: productSummary($, 'Fuel'),
      fuelTankCapacity: fuelTankCapacity($),
      mpg: productSummary($, 'MPG (combined)')
    },
    imageUrl: image($),
    make: videoDataTable($, 'Make'),
    mileage: productSummary($, 'Mileage'),
    model: videoDataTable($, 'Model'),
    registration: registration($),
    seats: seats($),
    towing: {
      maxTowingWeightBraked: maxTowingWeightBraked($),
      maxTowingWeightUnbraked: maxTowingWeightUnbraked($),
      minimumKerbWeight: minimumKerbWeight($),
    },
    turningCircle: turningCircle($),
    year: year($)
  }
}

const breakHorsePower = ($) => {
  return parseInt(
    techSpecs($, 'Engine Power - BHP')
  )
}

const acceleration = ($) => {
  return parseInt(
    techSpecs($, '0 to 62 mph (secs)')
  )
}

const engineSize = ($) => {
  engineCC = parseFloat(
    productSummary($, 'Engine').replace('cc', '')
  )

  engineLitres = engineCC / 1000

  return parseFloat(
    engineLitres.toFixed(2)
  )
}

const fuelTankCapacity = () => {
  return parseInt(
    techSpecs($, 'Fuel Tank Capacity (Litres)')
  )
}

const image = ($) => {
  return $('.ac-imagethumbnail img').first().attr('src')
}

const maxTowingWeightBraked = ($) => {
  parsed = parseInt(
    techSpecs($, 'Max. Towing Weight - Braked')
  )
  return defaultToZero(parsed)
}

const maxTowingWeightUnbraked = ($) => {
  parsed = parseInt(
    techSpecs($, 'Max. Towing Weight - Unbraked')
  )
  // TODO: Keep an eye out for a car to VCR for this to test!
  return defaultToZero(parsed)
}

const minimumKerbWeight = ($) => {
  parsed = parseInt(
    techSpecs($, 'Minimum Kerbweight')
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

const seats = ($) => {
  return parseInt(
    productSummary($, 'Seats')
  )
}

const turningCircle = ($) => {
  return parseInt(
    techSpecs($, 'Turning Circle - Kerb to Kerb')
  )
}

const year = ($) => {
  return parseInt(
    productSummary($, 'Year')
  )
}

const defaultToZero = (value) => {
  return isNaN(value) ? 0 : value
}

module.exports = {
  build
}
