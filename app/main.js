require('dotenv').config()
require('sepia')

const scrapedCar = require('./arnold_clark/scraped_car')
const carLinks = require('./arnold_clark/car_links')
const {
  finishScrapeRun,
  saveFailedCar,
  saveSuccessfulCar,
  saveScrapeRun
} = require('./arnold_clark/repository')

const run = async () => {
  scrapeCars('Used%20Cars', 'used')
  scrapeCars('Nearly%20New%20Cars', 'nearly-new')
}

const scrapeCars = async (searchType, scrapeType) => {
  const firstPage = await carLinks.scrape(searchType, 1)
  const scrapeRunId = await saveScrapeRun(scrapeType)
  if (scrapeRunId == null) {
    return
  }
  for (let page = 1; page <= firstPage.total_pages; page++) {
    console.log('scraping page', page)
    const data = await carLinks.scrape(searchType, firstPage.total_cars, page)
    data.car_data.forEach((carUrl) => {
      processCar(carUrl, scrapeRunId)
    })
  }
  finishScrapeRun(scrapeRunId)
}

const processCar = async (carUrl, scrapeRunId) => {
  try {
    const car = await scrapedCar.retrieve(carUrl)
    console.log('saving scraped car')
    saveSuccessfulCar(car, scrapeRunId)
  } catch (error) {
    console.log('saving failed car')
    let message = error
    if (error.statusCode == 404) {
      message = `Status code: ${error.statusCode}, Error type: ${error.name}`
    }
    saveFailedCar(carUrl, scrapeRunId, message)
  }
}

run()

