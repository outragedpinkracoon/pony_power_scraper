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
  scrapeRun('Used%20Cars', 'used')
  scrapeRun('Nearly%20New%20Cars', 'nearly-new')
}

const runTotals = async (searchType) => {
  const firstPage = await carLinks.scrape(searchType, 1)
  return {
    pages: firstPage.total_pages,
    cars: firstPage.total_cars
  }
}

const scrapeRun = async (searchType, scrapeType) => {
  const totals = await runTotals(searchType)
  const scrapeRunId = await saveScrapeRun(scrapeType)

  await scrapeCars(totals, scrapeRunId, searchType)
  finishScrapeRun(scrapeRunId)
}

const scrapeCars = async (total, scrapeRunId, searchType) => {
  for (let page = 1; page <= total.pages; page++) {
    console.log('scraping page', page)
    const data = await carLinks.scrape(searchType, total.cars, page)
    data.car_data.forEach((carUrl) => {
      processCar(carUrl, scrapeRunId)
    })
  }
}

const processCar = async (carUrl, scrapeRunId) => {
  try {
    const car = await scrapedCar.retrieve(carUrl)
    saveSuccessfulCar(car, scrapeRunId)
  } catch (error) {
    let message = error
    if (error.statusCode == 404) {
      message = `Status code: ${error.statusCode}, Error type: ${error.name}`
    }
    saveFailedCar(carUrl, scrapeRunId, message)
  }
}

run()

