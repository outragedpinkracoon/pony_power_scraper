require('dotenv').config()
require('sepia')

const scrapedCar = require('./arnold_clark/scraped_car')
const carLinks = require('./arnold_clark/car_links')
const { saveCar, saveScrapeRun } = require('./arnold_clark/repository')

const run = async () => {
  scrapeCars('Used%20Cars', 'used')
  scrapeCars('Nearly%20New%20Cars', 'nearly-new')
}

const scrapeCars = async (searchType, scrapeType) => {
  const data = await carLinks.scrape(searchType, 2)
  const scrapeRunId = await saveScrapeRun(scrapeType)
  if (scrapeRunId == null) {
    return
  }
  data.car_data.forEach((carUrl) => {
    processCar(carUrl, scrapeRunId)
  })
}

const processCar = async (carUrl, scrapeRunId) => {
  try {
    const car = await scrapedCar.retrieve(carUrl)
    if (car == null) {
      console.error('car could not be saved: ', carUrl)
      return
    }
    saveCar(car, scrapeRunId)
    console.log('car saved', carUrl)
  } catch (error) {
    console.error('could not process car:', carUrl)
  }
}

run()

