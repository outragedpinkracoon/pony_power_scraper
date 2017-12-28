const sections = require('./car_page_sections')

const productSummary = sections.productSummary
const techSpecs = sections.techSpecs
const reactProps = sections.reactProps
const videoDataTable = sections.videoDataTable

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
      engineSize: engineSize($),
      mpg: productSummary($, 'MPG (combined)'),
      fuel: productSummary($, 'Fuel'),
      fuelTankCapacity: fuelTankCapacity($),
      breakHorsePower: breakHorsePower($)
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
  return parseInt(
    techSpecs($, 'Max. Towing Weight - Unbraked')
  )
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
