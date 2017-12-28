require('sepia')

scrapedCar = require('./arnold_clark/scraped_car')
usedCarLinks = require('./arnold_clark/used_car_links')
nearlyNewCarLinks = require('./arnold_clark/nearly_new_car_links')

const run = async () => {
  scrapeCars(usedCarLinks, 'USED')
  scrapeCars(nearlyNewCarLinks, 'NEARLY NEW')
}

const scrapeCars = async (carLinks, title) => {
  const links = await carLinks.scrape()
  links.forEach((carUrl) => {
    buildCar(carUrl, title)
  })
}

const buildCar = async (carUrl, title) => {
  const car = await scrapedCar.retrieve(carUrl)
  console.log(`**************** ${title} CAR ******************`)
  console.log(car)
}

run()

