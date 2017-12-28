const sections = require('./car_page_sections')

const productSummary = sections.productSummary
const techSpecs = sections.techSpecs
const reactProps = sections.reactProps
const videoDataTable = sections.videoDataTable

const build = ($, carUrl) => {
  return {
    bodyType: videoDataTable($, 'Body Type'),
    breakHorsePower: breakHorsePower($),
    carUrl: carUrl,
    colour: productSummary($, 'Colour'),
    engine: engine($),
    fuel: productSummary($, 'Fuel'),
    fuelTankCapacity: fuelTankCapacity($),
    imageUrl: image($),
    make: videoDataTable($, 'Make'),
    maxTowingWeightBraked: maxTowingWeightBraked($),
    maxTowingWeightUnbraked: maxTowingWeightUnbraked($),
    minimumKerbWeight: minimumKerbWeight($),
    mileage: productSummary($, 'Mileage'),
    model: videoDataTable($, 'Model'),
    mpg: productSummary($, 'MPG (combined)'),
    price: price($),
    registration: registration($),
    roadTax: roadTax($),
    seats: seats($),
    turningCircle: turningCircle($),
    year: year($)
  }
}

const breakHorsePower = ($) => {
  return parseInt(
    techSpecs($, 'Engine Power - BHP')
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

const fuelTankCapacity = () => {
  return parseInt(
    techSpecs($, 'Fuel Tank Capacity (Litres)')
  )
}

const image = ($) => {
  return $('.ac-imagethumbnail img').first().attr('src')
}

const maxTowingWeightBraked = ($) => {
  return parseInt(
    techSpecs($, 'Max. Towing Weight - Braked')
  )
}

const maxTowingWeightUnbraked = ($) => {
  return parseInt(
    techSpecs($, 'Max. Towing Weight - Unbraked')
  )
}

const minimumKerbWeight = ($) => {
  return parseInt(
    techSpecs($, 'Minimum Kerbweight')
  )
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

module.exports = {
  build
}
