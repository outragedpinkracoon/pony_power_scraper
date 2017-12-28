require('sepia')

scrapedCar = require('./arnold_clark/scraped_car')
carLinks = require('./arnold_clark/car_links')

const run = async () => {
  scrapeCars('Used%20Cars', 'USED')
  scrapeCars('Nearly%20New%20Cars', 'NEARLY NEW')
}

const scrapeCars = async (searchType, title) => {
  const data = await carLinks.scrape(searchType, 5)
  data.car_data.forEach((carUrl) => {
    buildCar(carUrl, title)
  })
}

const buildCar = async (carUrl, title) => {
  const car = await scrapedCar.retrieve(carUrl)
  console.log(`**************** ${title} CAR ******************`)
  console.log(car)
}

run()

