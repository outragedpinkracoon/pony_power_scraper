require('sepia')

carBuilder = require('./arnold_clark/car_builder')
usedCarLinks = require('./arnold_clark/used_car_links')

const run = async () => {
  const links = await usedCarLinks.scrape()
  links.forEach((carUrl) => {
    buildCar(carUrl)
  })
}

const buildCar = async (carUrl) => {
  const car = await carBuilder.scrape(carUrl)
  console.log(car)
}

run()

