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

const scrapeRun = async (searchTypeParam, scrapeType) => {
  const totals = await runTotals(searchTypeParam)
  const scrapeRunId = await saveScrapeRun(scrapeType)
  await scrapeCars(totals, scrapeRunId, searchTypeParam, scrapeType)
  finishScrapeRun(scrapeRunId)
}

const scrapeCars = async (total, scrapeRunId, searchTypeParam, scrapeType) => {
  for (let page = 1; page <= total.pages; page++) {
    const data = await carLinks.scrape(searchTypeParam, total.cars, page)
    data.car_data.forEach((carUrl) => {
      processCar(carUrl, scrapeRunId, scrapeType)
    })
  }
}

const processCar = async (carUrl, scrapeRunId, scrapeType) => {
  try {
    const car = await scrapedCar.retrieve(carUrl, scrapeType)
    saveSuccessfulCar(car, scrapeRunId)
  } catch (error) {
    let message = error
    if (error.statusCode == 404) {
      message = `Status code: ${error.statusCode}, Error type: ${error.name}`
    }
    saveFailedCar(carUrl, scrapeRunId, message)
  }
}

const runTotals = async (searchTypeParam) => {
  const firstPage = await carLinks.scrape(searchTypeParam, 1)
  return {
    pages: firstPage.total_pages,
    cars: firstPage.total_cars
  }
}

run()

