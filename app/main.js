require('sepia')

scrapedCar = require('./arnold_clark/scraped_car')
usedCarLinks = require('./arnold_clark/used_car_links')

const run = async () => {
  const links = await usedCarLinks.scrape()
  links.forEach((carUrl) => {
    buildCar(carUrl)
  })
}

const buildCar = async (carUrl) => {
  const car = await scrapedCar.retrieve(carUrl)
  console.log(car)
}

run()

